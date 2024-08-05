import type { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import path from 'path';

// Đọc tệp khóa từ thư mục public
const keyFilename = path.join(process.cwd(), 'public', 'service-account-keyfile.json');

// Tạo instance của Google Cloud Storage
const storage = new Storage({
  keyFilename,
});
const bucket = storage.bucket('hoangphuc'); // Thay thế bằng tên bucket của bạn

export const config = {
  api: {
    bodyParser: false, // Tắt body parser của Next.js
  },
};

const fetchImageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const imageName = query.imageName as string;

  if (!imageName) {
    return res.status(400).json({ error: 'Image name is required' });
  }

  try {
    // Lấy file từ bucket
    const file = bucket.file(imageName);
    const [exists] = await file.exists();

    if (!exists) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Lấy metadata của file để xác định loại nội dung
    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType || 'application/octet-stream';

    // Tải nội dung file
    const [fileContents] = await file.download();

    // Trả về hình ảnh
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', fileContents.length);
    res.status(200).send(fileContents);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};

export default fetchImageHandler;

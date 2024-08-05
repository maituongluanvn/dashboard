import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

// Đọc tệp khóa từ thư mục public
const keyFilename = path.join(process.cwd(), 'public', 'service-account-keyfile.json');

const storage = new Storage({
  keyFilename,
});
const bucket = storage.bucket('hoangphuc');

export const config = {
  api: {
    bodyParser: false, // Tắt body parser của Next.js
  },
};

const uploadHandler = async (req: any, res: any) => {
  const form = new IncomingForm();

  // Xác định đường dẫn thư mục public
  const tempDir = path.join(process.cwd(), 'tmp', 'uploads');

  // Kiểm tra và tạo thư mục uploads nếu không tồn tại
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  form.uploadDir = tempDir;

  // Chuyển đổi form.parse thành một Promise
  const parseForm = () =>
    new Promise((resolve, reject) => {
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

  try {
    const { files } = await parseForm();
    
    const file = files.file ? files.file[0] : null; // Xác nhận file tồn tại
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath;
    const destination = `uploads/${path.basename(filePath)}`;

    await bucket.upload(filePath, {
      destination,
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    fs.unlinkSync(filePath); // Xóa tệp tạm sau khi upload

    res.status(200).json({ url: `https://storage.googleapis.com/hoangphuc/${destination}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export default uploadHandler;

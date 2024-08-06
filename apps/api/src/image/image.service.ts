import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly storage: Storage;
  private readonly bucketName: string = 'hoangphuc'; // Tên bucket của bạn

  constructor() {
    this.storage = new Storage({
      keyFilename: path.join(__dirname,'..', '..', 'service-account-keyfile.json'), // Đường dẫn đến tệp khóa
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(`uploads/${uuidv4()}_${file.originalname}`); // Sửa đường dẫn để bao gồm thư mục uploads
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      Readable.from(file.buffer).pipe(blobStream)
        .on('error', (err) => reject(err))
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketName}/uploads/${blob.name}`;
          resolve(publicUrl);
        });
    });
  }

  async fetchImage(filename: string): Promise<Buffer> {
    const bucket = this.storage.bucket(this.bucketName);
    console.log("🚀 ~ ImageService ~ fetchImage ~ bucket:", bucket)
    const file = bucket.file(`uploads/bf4fb9cabecae802cb8684005`); // Sửa đường dẫn để bao gồm thư mục uploads

    return new Promise((resolve, reject) => {
      file.download((err, data) => {
        if (err) {
          console.error('Error downloading file:', err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly storage: Storage;
  private readonly bucketName: string = 'hoangphuc'; // Thay thế với tên bucket của bạn

  constructor() {
    this.storage = new Storage({
      keyFilename: path.join(__dirname, '..', '..', '..', 'service-account-keyfile.json'), // Đường dẫn đến tệp khóa
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(`${uuidv4()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      Readable.from(file.buffer).pipe(blobStream)
        .on('error', (err) => reject(err))
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
          resolve(publicUrl);
        });
    });
  }

  async fetchImage(filename: string): Promise<Buffer> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(filename);

    return new Promise((resolve, reject) => {
      file.download((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

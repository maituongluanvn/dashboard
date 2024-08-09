import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
	private storage: Storage | null = null; // Không dùng readonly ở đây
	private readonly bucketName: string = 'hoangphuc'; // Tên bucket của bạn

	constructor() {
		this.initializeStorage().catch(err => {
			throw new HttpException(
				`Failed to initialize storage: ${err.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		});
	}

	private async initializeStorage(): Promise<void> {
		const projectId = process.env.GOOGLE_PROJECT_ID;
		const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
		const privateKey = process.env.GOOGLE_PRIVATE_KEY;
		const privateKeyId = process.env.GOOGLE_PRIVATE_KEY_ID;

		if (!projectId || !clientEmail || !privateKey || !privateKeyId) {
			throw new HttpException('Missing required environment variables', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		try {
			// Khởi tạo Storage với thông tin xác thực từ biến môi trường
			this.storage = new Storage({
				projectId,
				credentials: {
					client_email: clientEmail,
					private_key: privateKey.replace(/\\n/g, '\n'),
					private_key_id: privateKeyId,
				},
			});
		} catch (err) {
			throw new HttpException(
				`Failed to initialize storage: ${err.message}`,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	private checkStorageInitialized() {
		if (!this.storage) {
			throw new HttpException('Storage not initialized', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async uploadFile(file: Express.Multer.File): Promise<string> {
		this.checkStorageInitialized();

		const bucket = this.storage.bucket(this.bucketName);
		const blob = bucket.file(`uploads/${uuidv4()}_${file.originalname}`); // Thư mục uploads
		const blobStream = blob.createWriteStream({
			resumable: false,
			contentType: file.mimetype,
		});

		return new Promise((resolve, reject) => {
			Readable.from(file.buffer)
				.pipe(blobStream)
				.on('error', err => reject(err))
				.on('finish', () => {
					const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
					resolve(publicUrl);
				});
		});
	}

	async fetchImage(filename: string): Promise<Buffer> {
		this.checkStorageInitialized();

		const bucket = this.storage.bucket(this.bucketName);
		const file = bucket.file(`uploads/${filename}`); // Đảm bảo đường dẫn đúng

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

	async deleteFile(filename: string): Promise<void> {
		this.checkStorageInitialized();

		const bucket = this.storage.bucket(this.bucketName);
		const file = bucket.file(`uploads/${filename}`); // Đảm bảo đường dẫn đúng

		try {
			await file.delete();
		} catch (error) {
			console.error('Error deleting file:', error);
			throw new HttpException('Failed to delete file', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

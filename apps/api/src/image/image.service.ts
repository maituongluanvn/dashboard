import * as sharp from 'sharp';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
	private storage: Storage | null = null;
	private readonly bucketName: string = 'hoangphuc';

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
		const privateKey = process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n');
		const privateKeyId = process.env.GOOGLE_PRIVATE_KEY_ID;

		if (!projectId || !clientEmail || !privateKey || !privateKeyId) {
			throw new HttpException('Missing required environment variables', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		try {
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

		// Convert the image to WebP format using sharp
		const convertedImage = await sharp(file.buffer)
			.webp({ quality: 100 }) // Adjust the quality as needed
			.toBuffer();

		const bucket = this.storage.bucket(this.bucketName);
		const webpFileName = `uploads/${uuidv4()}.webp`; // Save as WebP format
		const blob = bucket.file(webpFileName);
		const blobStream = blob.createWriteStream({
			resumable: false,
			contentType: 'image/webp', // Set the content type to WebP
		});

		return new Promise((resolve, reject) => {
			Readable.from(convertedImage)
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
		const file = bucket.file(`uploads/${filename}`);

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
		console.log('🚀 ~ ImageService ~ deleteFile ~ filename:', filename);
		this.checkStorageInitialized();

		const bucket = this.storage.bucket(this.bucketName);
		const file = bucket.file(`uploads/${filename}`);

		try {
			await file.delete();
		} catch (error) {
			console.error('Error deleting file:', error);
			throw new HttpException('Failed to delete file', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

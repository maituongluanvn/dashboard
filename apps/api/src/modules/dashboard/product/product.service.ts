import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { IProduct, CreateProductDto } from '@cores/definition';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@schemas/product.schema';
import type { Model } from 'mongoose';

@Injectable()
export class ProductService {
	constructor(@InjectModel(Product.name) private products: Model<Product>) {}

	async getAllProducts(): Promise<IProduct[]> {
		return this.products.find();
	}

	async getCategories(): Promise<any[]> {
		const categories = [
			{ _id: '1', name: 'Vitamin - khoáng chất' },
			{ _id: '2', name: 'Amino acid' },
			{ _id: '3', name: 'Bù nước - điện giải' },
			{ _id: '4', name: 'Giảm đau - hạ sốt' },
			{ _id: '5', name: 'Kháng sinh' },
			{ _id: '6', name: 'Dạ dày' },
			{ _id: '7', name: 'Miễn dịch - NSAID' },
			{ _id: '8', name: 'Cảm cúm - giảm đau - hạ sốt - kháng viêm' },
			{ _id: '9', name: 'Huyết áp' },
			{ _id: '10', name: 'Đường huyết' },
			{ _id: '11', name: 'Thần kinh' },
		];

		return categories;
	}

	async findByCategoryName(categoryName: string): Promise<Product[]> {
		const regex = new RegExp(categoryName, 'i');
		const products = await this.products.find({ 'category.name': { $regex: regex } }).exec();
		return products;
	}

	async getProductById(id: string): Promise<IProduct | undefined> {
		return await this.products.findById(id);
	}

	// Hàm kiểm tra hợp lệ của ObjectId
	private isValidObjectId(id: string): boolean {
		return /^[a-fA-F0-9]{24}$/.test(id); // Cấu trúc chuẩn của ObjectId trong MongoDB
	}

	// todo: need update promise<any>
	async getProductBySlugAndId(idOrSlug: string): Promise<any> {
		let product;
		if (this.isValidObjectId(idOrSlug)) {
			product = await this.products.findById(idOrSlug).exec();
		} else {
			product = await this.products.findOne({ slug: idOrSlug }).exec();
		}

		return product;
	}

	async createProduct(product: CreateProductDto): Promise<void> {
		try {
			// Create a new product and save it
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			await (await this.products.create(product)).save();
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'An error occurred while creating the product',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateProduct(id: string, updatedProduct: Partial<IProduct>): Promise<void> {
		await this.products.findByIdAndUpdate(id, updatedProduct, { new: true });
	}

	async deleteProduct(id: string): Promise<IProduct | null> {
		return this.products.findByIdAndDelete(id);
	}
}

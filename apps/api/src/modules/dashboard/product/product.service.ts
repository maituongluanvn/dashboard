import { Injectable } from '@nestjs/common';
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
			{ id: '1', name: 'Vitamin - khoáng chất' },
			{ id: '2', name: 'Amino acid' },
			{ id: '3', name: 'Bù nước - điện giải' },
			{ id: '4', name: 'Giảm đau - hạ sốt' },
			{ id: '5', name: 'Kháng sinh' },
			{ id: '6', name: 'Dạ dày' },
			{ id: '7', name: 'Miễn dịch - NSAID' },
			{ id: '8', name: 'Cảm cúm - giảm đau - hạ sốt - kháng viêm' },
			{ id: '9', name: 'Huyết áp' },
			{ id: '10', name: 'Đường huyết' },
			{ id: '11', name: 'Thần kinh' },
		];

		return categories;
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

		// Kiểm tra xem idOrSlug có phải là ID hay không (chẳng hạn bằng cách sử dụng phương thức kiểm tra hợp lệ của Mongoose)
		if (this.isValidObjectId(idOrSlug)) {
			product = await this.products.findById(idOrSlug).exec();
		} else {
			product = await this.products.findOne({ slug: idOrSlug }).exec();
		}

		return product;
	}

	async createProduct(product: CreateProductDto): Promise<void> {
		(await this.products.create(product)).save();
	}

	async updateProduct(id: string, updatedProduct: Partial<IProduct>): Promise<IProduct | null> {
		return this.products.findByIdAndUpdate(id, updatedProduct, { new: true });
	}

	async deleteProduct(id: string): Promise<IProduct | null> {
		return this.products.findByIdAndDelete(id);
	}
}

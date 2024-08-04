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

	async getProductById(id: string): Promise<IProduct | undefined> {
		return await this.products.findById(id);
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

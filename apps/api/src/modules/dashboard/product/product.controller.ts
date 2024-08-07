import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IApiResponse } from '@common/api-responese.interface';
import { ProductService } from './product.service';
import { IProduct, CreateProductDto } from '@cores/definition';

const prefix = 'dashboard/product';

@ApiTags(prefix)
@Controller(prefix)
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAllProducts(): Promise<IProduct[]> {
		return this.productService.getAllProducts();
	}

	@Get('/categories')
	async getCategories(): Promise<IProduct[]> {
		return this.productService.getCategories();
	}

	@Get(':id')
	async getProductBySlug(@Param('id') id: string): Promise<IProduct | undefined> {
		return this.productService.getProductBySlugAndId(id);
	}

	@Post()
	async createProduct(@Body() product: CreateProductDto): Promise<IApiResponse> {
		await this.productService.createProduct(product);
		return { status: HttpStatus.OK, message: 'Product created successfully' };
	}

	@Put(':id')
	async updateProduct(
		@Param('id') id: string,
		@Body() updatedProduct: Partial<IProduct>,
	): Promise<IApiResponse> {
		console.log("🚀 ~ ProductController ~ id:", id)
		await this.productService.updateProduct(id, updatedProduct);
		return { status: HttpStatus.OK, message: 'Product Update successfully' };
	}

	@Delete(':id')
	async deleteProduct(@Param('id') id: string): Promise<void> {
		await this.productService.deleteProduct(id);
	}
}

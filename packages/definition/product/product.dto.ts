import { IsString, IsNotEmpty, ValidateNested, IsArray,IsNumber, IsOptional } from 'class-validator';
import { Type as TransformType } from 'class-transformer';
import { UniqueFieldValidator} from '../unique-field.validator'

export class Gross {
	@IsNotEmpty()
	@IsString()
	currency: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;
}

export class PriceRange {
	@ValidateNested()
	@TransformType(() => Gross)
	gross: Gross;
}

export class Pricing {
	@ValidateNested()
	@TransformType(() => PriceRange)
	start: PriceRange;

	@ValidateNested()
	@TransformType(() => PriceRange)
	stop: PriceRange;
}

export class VariantPricing {
	@ValidateNested()
	@TransformType(() => Gross)
	gross: Gross;
}

export class Variant {
	@IsOptional()
	@IsString()
	id?: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	quantityAvailable: number;

	@ValidateNested()
	@TransformType(() => VariantPricing)
	pricing: VariantPricing;
}

export class Category {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsString()
	name: string;
}

export class Thumbnail {
	@IsNotEmpty()
	@IsString()
	url: string;

	@IsOptional()
	@IsString()
	alt: string;
}

export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@UniqueFieldValidator({ message: 'The slug must be unique.' })
	slug: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsString()
	seoTitle: string;

	@IsNotEmpty()
	@IsString()
	seoDescription: string;

	@IsNotEmpty()
	@IsString()
	belongTo: string;

	@ValidateNested()
	@TransformType(() => Pricing)
	pricing: Pricing;

	@IsArray()
	@ValidateNested({ each: true })
	@TransformType(() => Variant)
	variants: Variant[];

	@ValidateNested()
	@TransformType(() => Category)
	category: Category;

	@ValidateNested()
	@TransformType(() => Thumbnail)
	thumbnail: Thumbnail;
}

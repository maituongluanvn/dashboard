import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';
import type { IProductCategory, IThumbnail } from '@cores/definition';

export type TProductDocument = Product & Document;

class VariantPricing {
	@Prop({ required: true, type: String })
	currency: string;

	@Prop({ required: true, type: Number })
	amount: number;
}

class Variant {
	@Prop({ required: true, type: String })
	id: string;

	@Prop({ required: true, type: String })
	name: string;

	@Prop({ required: true, type: Number })
	quantityAvailable: number;

	@Prop({ required: true, type: VariantPricing })
	pricing: VariantPricing;
}

@Schema({ timestamps: true, collection: 'products' })
export class Product {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	slug: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	seoTitle: string;

	@Prop({ required: true })
	seoDescription: string;

	@Prop({ required: true })
	belongTo: string;

	@Prop({
		required: true,
		type: {
			priceRange: {
				start: { gross: { amount: Number, currency: String } },
				stop: { gross: { amount: Number, currency: String } },
			},
		},
	})
	pricing: {
		priceRange: {
			start: { gross: { amount: number; currency: string } };
			stop: { gross: { amount: number; currency: string } };
		};
	};

	@Prop({ required: true, type: [Variant] })
	variants: Variant[];

	@Prop({ required: true, type: { id: String, name: String } })
	category: IProductCategory;

	@Prop({ required: true, type: { url: String, alt: String } })
	thumbnail: IThumbnail;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

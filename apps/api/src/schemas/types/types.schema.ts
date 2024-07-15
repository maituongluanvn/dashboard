import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type CommonTypesDocument = HydratedDocument<CommonTypes>;

@Schema({ timestamps: true, collection: 'common_types' })
export class CommonTypes extends Document {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, type: ['abc'] })
	value: any;
}

export const CommonTypesSchema = SchemaFactory.createForClass(CommonTypes);

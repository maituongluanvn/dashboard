import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CurrenciesTypeDocument = HydratedDocument<CurrenciesType>;

@Schema({ timestamps: true, collection: 'currenciesType' })
export class CurrenciesType {
	@Prop({ required: true })
	typeName: string;
}

export const CurrenciesTypeSchema = SchemaFactory.createForClass(CurrenciesType);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<TransactionDto>;

@Schema({ timestamps: true, collection: 'transactions' })
export class TransactionDto {
	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	amount: string;

	@Prop({ required: true, ref: 'currenciesType' })
	currency: string;

	@Prop({ required: true })
	by: string;

	@Prop({ required: true, ref: 'spentType' })
	typeOfUse: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDto);

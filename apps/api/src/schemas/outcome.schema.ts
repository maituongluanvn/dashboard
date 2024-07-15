import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OutcomeDocument = HydratedDocument<Outcome>;

@Schema({ timestamps: true, collection: 'outcomes' })
export class Outcome {
	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	amount: string;

	@Prop({ required: true, ref: 'currenciesType' })
	currency: string;

	@Prop({ required: true })
	spentedAt: Date;

	@Prop({ required: true })
	by: string;

	@Prop({ required: true, ref: 'spentType' })
	typeOfOutcome: string;
}

export const OutcomeSchema = SchemaFactory.createForClass(Outcome);

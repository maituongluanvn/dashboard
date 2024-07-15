import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
// import { Document } from 'mongoose';

export type SettingsDocument = HydratedDocument<Settings>;

@Schema({ timestamps: true, collection: 'settings' })
export class Settings {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, type: [] })
	value: any[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

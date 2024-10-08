import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
	@Prop({ required: true })
	username: string;

	@Prop({ required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

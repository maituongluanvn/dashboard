import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Settings, SettingsSchema } from '@schemas/settings.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }])],
	controllers: [SettingsController],
	providers: [SettingsService],
	exports: [SettingsService],
})
export default class SettingsModule {}

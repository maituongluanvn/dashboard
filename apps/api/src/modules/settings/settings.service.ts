import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Settings, SettingsDocument } from '@schemas/settings.schema';

@Injectable()
export class SettingsService {
	constructor(@InjectModel(Settings.name) private settingsModel: Model<Settings>) {}

	async findByName(name: string): Promise<SettingsDocument> {
		return this.settingsModel.findOne({ name });
	}

	async createSetting(setting: Settings): Promise<void> {
		this.settingsModel.create(setting);
	}
}

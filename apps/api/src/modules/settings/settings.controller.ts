import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

const name = 'settings';

@ApiTags(name)
@Controller(name)
export class SettingsController {
	constructor(private readonly service: SettingsService) {}

	@Get()
	findByParams(): any {
		return this.service.findByName('abc');
	}

	@Post()
	createSetting(): void {
		const setting = {
			name: 'spentType',
			value: [{ text: 'Nhậu', callback_data: 'drink' }],
		};
		this.service.createSetting(setting);
	}
}

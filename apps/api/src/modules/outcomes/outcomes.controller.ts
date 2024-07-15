import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OutcomesService } from './outcomes.service';

const name = 'outcomes';

@ApiTags(name)
@Controller(name)
export class OutcomesController {
	constructor(private outcomesService: OutcomesService) {}

	@Get()
	findByParams(): any {
		return this.outcomesService.findAll();
	}
}

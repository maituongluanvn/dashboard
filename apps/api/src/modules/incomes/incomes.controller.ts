import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const name = 'incomes';

@ApiTags(name)
@Controller(name)
export class IncomesController {
	@Get()
	findByParams(): string {
		return 'This action returns all cats';
	}
}

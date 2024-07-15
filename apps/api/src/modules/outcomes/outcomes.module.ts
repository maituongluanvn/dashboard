import { Module } from '@nestjs/common';
import { OutcomesController } from './outcomes.controller';
import { OutcomesService } from './outcomes.service';
import { Outcome, OutcomeSchema } from '@schemas/outcome.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{ name: Outcome.name, schema: OutcomeSchema }])],
	controllers: [OutcomesController],
	providers: [OutcomesService],
})
export default class OutcomessModule {}

import type { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { OutcomeDocument } from '@schemas/outcome.schema';
import { Outcome } from '@schemas/outcome.schema';

@Injectable()
export class OutcomesService {
	constructor(@InjectModel(Outcome.name) private outcomesModel: Model<Outcome>) {}

	//   async create(createCatDto: CreateCatDto): Promise<any> {
	//     const createdCat = new this.outcomesModel(createCatDto);
	//     return createdCat.save();
	//   }

	async findAll(): Promise<OutcomeDocument[]> {
		return this.outcomesModel.find().exec();
	}
}

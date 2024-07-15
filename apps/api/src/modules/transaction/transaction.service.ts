// import { ITransaction } from '@cores/definition';
import { TransactionDto } from '@schemas/transaction.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
	constructor(@InjectModel(TransactionDto.name) private m: Model<TransactionDto>) {}

	async create(transactionDto: TransactionDto): Promise<TransactionDto> {
		const createdCat = new this.m(transactionDto);
		return createdCat.save();
	}

	async findAll(): Promise<TransactionDto[]> {
		return this.m.find().exec();
	}
}

import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionDto } from '@schemas/transaction.schema';
// import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { connector } from '@telegram/connector';
import type { Model } from 'mongoose';
const name = 'transaction';

@ApiTags(name)
@Controller(name)
export class TransactionController {
	constructor(@InjectModel(TransactionDto.name) private m: Model<TransactionDto>) {}

	@Post()
	createTransaction(): string {
		return 'This action returns all cats';
	}
}

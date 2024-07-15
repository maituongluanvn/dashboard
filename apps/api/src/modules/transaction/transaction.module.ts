import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionDto, TransactionSchema } from '@schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
// @Module({
//   imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
//   controllers: [TransactionController],
// })
// export default class CatsModule {}

@Module({
	imports: [MongooseModule.forFeature([{ name: TransactionDto.name, schema: TransactionSchema }])],
	controllers: [TransactionController],
	providers: [TransactionService],
})
export default class TransactionModule {}

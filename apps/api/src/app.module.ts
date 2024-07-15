import type { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import IncomesModule from './modules/incomes/incomes.module';
import OutcomesModule from './modules/outcomes/outcomes.module';
import TransactionModule from './modules/transaction/transaction.module';
import CommonTypesModule from '@modules/settings/settings.module';
// import WebhookModule from './modules/webhook/webhook.module';
import LoggerMiddleware from '@middlewares/logger.middleware';
import configuration from './config/configuration';
// import { TelegramInstance } from '@common/axios';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [configuration], isGlobal: true, cache: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (_configService: ConfigService) => ({
				uri: process.env.MONGO_URI,
			}),
			inject: [ConfigService],
		}),
		IncomesModule,
		OutcomesModule,
		TransactionModule,
		CommonTypesModule,
		// TelegramInstance,
	],
	// controllers: [AppController],
	// providers: [TelegramInstance],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}

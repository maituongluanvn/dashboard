import type { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import IncomesModule from './modules/incomes/incomes.module';
import OutcomesModule from './modules/outcomes/outcomes.module';
import TransactionModule from './modules/transaction/transaction.module';
import CommonTypesModule from '@modules/settings/settings.module';
import ProductModule from './modules/dashboard/product/product.module';
// import WebhookModule from './modules/webhook/webhook.module';
import LoggerMiddleware from '@middlewares/logger.middleware';
import configuration from './config/configuration';
// import { TelegramInstance } from '@common/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/http-exception.filter';
import { AppService } from './app.service';
@Module({
	imports: [
		ConfigModule.forRoot({ load: [configuration], isGlobal: true, cache: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URI'),
			}),
			inject: [ConfigService],
		}),
		IncomesModule,
		ProductModule,
		OutcomesModule,
		TransactionModule,
		CommonTypesModule,
		// TelegramInstance,
	],
	// controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}

import type { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
	private readonly logger = new Logger(AppService.name);

	constructor(@InjectConnection() private readonly connection: Connection) {}

	async onModuleInit() {
		this.logger.log('Connected to MongoDB');
		this.logger.log('Connected to database: ' + this.connection.db.databaseName);
	}
}

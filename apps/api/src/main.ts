import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { ValidationError } from '@nestjs/common';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';

// import env from '@config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('backend/api/v1');
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors: ValidationError[]) => {
				Logger.error(`ExceptionFactory: ${errors}`);
				return new BadRequestException(`Validation error ${errors} `);
			},
		}),
	);
	if (process.env.NODE_ENV) {
		const config = new DocumentBuilder()
			.setTitle('Backend API')
			.setDescription('Backend API')
			.setVersion(process.env.npm_package_version)
			// .addTag('cats')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('backend/api/swagger', app, document);
	}

	await app.listen(8888, () => {
		Logger.log('========= Listen at port 8888');
	});
}
bootstrap();

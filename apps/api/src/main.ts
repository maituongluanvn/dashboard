import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Enable CORS with specific configurations
	app.enableCors({
		origin: '*', // Allow all origins, you can also specify an array of allowed origins
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
		allowedHeaders: 'Content-Type, Accept', // Specify allowed headers
		credentials: true, // Allow cookies to be sent with requests
	});

	app.setGlobalPrefix('api');
	if (process.env.NODE_ENV) {
		const config = new DocumentBuilder()
			.setTitle('Backend API')
			.setDescription('Backend API')
			.setVersion(process.env.npm_package_version)
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/swagger', app, document);
	}

	await app.listen(8888, () => {
		Logger.log('========= Listen at port 8888');
	});
}

void bootstrap();

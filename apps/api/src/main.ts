import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

// import env from '@config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	if (process.env.NODE_ENV) {
		const config = new DocumentBuilder()
			.setTitle('Backend API')
			.setDescription('Backend API')
			.setVersion(process.env.npm_package_version)
			// .addTag('cats')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/swagger', app, document);
	}

	await app.listen(8888, () => {
		Logger.log('========= Listen at port 8888');
	});
}
bootstrap();

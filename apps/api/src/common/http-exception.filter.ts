import { ExceptionFilter, ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { IApiResponse } from '@common/api-responese.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.BAD_REQUEST;
		const message = exception.message || 'Something went wrong';
		const stack = exception.stack || '';

		// Log the error details
		// this.logger.error(`HTTP Status: ${status} | ${message}`, stack);
		this.logger.error(`HTTP Status: ${status} | ${message}`);

		// const apiResponse: IApiResponse = {
		// 	status: status,
		// 	message: message,
		// };

		// response.status(status).json(apiResponse);
	}
}

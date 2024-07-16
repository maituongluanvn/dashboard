import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { IApiResponse } from '@common/api-responese.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const request = ctx.getRequest<Request>();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.BAD_REQUEST;

		const apiResponse: IApiResponse = {
			status: status,
			message: exception.message || 'Something went wrong',
		};

		response.status(status).json(apiResponse);
	}
}

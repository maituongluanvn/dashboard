import type { HttpStatus } from '@nestjs/common';

export interface IApiResponse {
	status: HttpStatus;
	message: string;
}

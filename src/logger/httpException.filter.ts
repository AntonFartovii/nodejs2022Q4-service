import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let statusMessage = exception.message;

    if (status >= 500) {
      this.logger.error(
        `Url: ${request.originalUrl}  -  ${status} : ${statusMessage}`,
      );

      statusMessage = 'Internal server error';
    }

    if (status >= 400 && status < 500) {
      this.logger.warn(
        `Url: ${request.originalUrl}  -  ${status} : ${statusMessage}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      message: statusMessage,
    });
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
      error: exception instanceof Error ? exception.name : 'Unknown error',
    };

    if (exception instanceof Error) {
      this.logger.error('Stack trace:' + exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.getStatus();
    const { message, name } = exception;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message: message,
      error: name,
    };

    this.logger.error(
      'CustomHTTPExceptionFilter - Stack trace:' +
        message +
        '\n' +
        exception.stack,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

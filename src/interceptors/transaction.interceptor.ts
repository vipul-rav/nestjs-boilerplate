import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';

const TRANSACTION_ID_HEADER = 'x-lbg-correlation-id';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: any = context.switchToHttp().getRequest();
    const res: any = context.switchToHttp().getResponse();

    req.headers[TRANSACTION_ID_HEADER] =
      req.headers[TRANSACTION_ID_HEADER] || randomUUID();

    const headerValue = String(req.headers[TRANSACTION_ID_HEADER]);
    if (res && typeof res.header === 'function') {
      // Fastify reply
      res.header(TRANSACTION_ID_HEADER, headerValue);
    } else if (res && typeof res.setHeader === 'function') {
      // Express response
      res.setHeader(TRANSACTION_ID_HEADER, headerValue);
    }

    return next.handle();
  }
}

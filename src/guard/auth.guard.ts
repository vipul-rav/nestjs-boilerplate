import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // read Authorization header from request
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers?.authorization;

    if (!accessToken) {
      throw new UnauthorizedException(`no access token`);
    }

    // verify the JWT, return true if valid, false if invalid

    return true;
  }
}

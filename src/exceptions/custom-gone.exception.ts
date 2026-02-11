import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomGoneException extends HttpException {
  constructor(message: string = 'That resource has left the NEST') {
    super(
      {
        message,
        timestamp: new Date().toLocaleTimeString(),
        error: 'Gone',
        status: HttpStatus.GONE,
      },
      HttpStatus.GONE,
    );
  }
}

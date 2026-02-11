import { ApiProperty } from '@nestjs/swagger';

export class CustomExceptionDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}

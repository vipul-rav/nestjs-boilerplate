import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  artist: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  venue: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class TicketResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  artist: string;
  @ApiProperty()
  venue: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
}

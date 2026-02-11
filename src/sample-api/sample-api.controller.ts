import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  UseFilters,
} from '@nestjs/common';
import { SampleAPIService } from './sample-api.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CustomGoneException } from '../exceptions/custom-gone.exception';
import { TicketResponseDto } from './dto/response-ticket.dto';
import { CustomExceptionDto } from 'src/exceptions/dto/custom-exception.dto';
//import { CustomHttpExceptionFilter } from '../exceptions/custom-httpexception.filter';

@ApiBearerAuth()
@ApiTags('sample-api')
@Controller('sample-api')
@ApiHeader({
  name: 'Authorization',
  description: 'authorization token',
})
//@UseFilters(CustomHttpExceptionFilter)
//@UseGuards(AuthGuard)
export class SampleAPIController {
  constructor(private readonly sampleAPIService: SampleAPIService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sample tickets' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: [TicketResponseDto],
  })
  findAll() {
    return {
      tickets: this.sampleAPIService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sample ticket by ID' })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found',
    type: CustomExceptionDto,
  })
  findOne(@Param('id') id: string): { ticket: TicketResponseDto | undefined } {
    const ticket = this.sampleAPIService.findOne(Number(id));

    return {
      ticket: ticket,
    };
  }
  @Post()
  @ApiOperation({ summary: 'Create sample ticket' })
  create(@Body() body: CreateTicketDto) {
    const createTicketDto = new CreateTicketDto();
    Object.assign(createTicketDto, body);
    return this.sampleAPIService.create(createTicketDto);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update sample ticket' })
  update(@Param('id') id: string) {
    throw new CustomGoneException(
      `Ticket with ID ${id} is no longer available`,
    );
  }
}

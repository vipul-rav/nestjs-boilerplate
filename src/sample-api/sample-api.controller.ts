import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  UseFilters,
  Header,
  Headers,
  Logger,
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
  constructor(
    private readonly sampleAPIService: SampleAPIService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all sample tickets' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: [TicketResponseDto],
  })
  @ApiHeader({
    name: 'x-lbg-correlation-id',
    required: false,
    description: 'Optional transaction ID for tracking requests',
    example: 'abc-123-uuid',
  })
  findAll(@Headers('x-lbg-correlation-id') correlationId?: string) {
    this.logger.log(`findAll called - correlationId=${correlationId}`);
    return {
      tickets: this.sampleAPIService.findAll(correlationId || ''),
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
    this.logger.log(`findOne called - id=${id}`);
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

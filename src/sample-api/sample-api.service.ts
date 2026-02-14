import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TicketResponseDto } from './dto/response-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ISampleAPIRepository } from './interfaces/sample-api.repository.interface';

@Injectable()
export class SampleAPIService {
  constructor(
    private readonly sampleAPIRepository: ISampleAPIRepository,
    private readonly logger: Logger,
  ) {}

  findAll(correlationId: string): TicketResponseDto[] {
    this.logger.log(`service.findAll - correlationId=${correlationId}`);
    return this.sampleAPIRepository.findAll().map((ticket) => ({
      ...ticket,
      artist: ticket.artist ?? '',
      venue: ticket.venue ?? '',
      date: ticket.date ?? '',
      price: ticket.price ?? 0,
      description: ticket.description ?? '',
    }));
  }

  findOne(id: number): TicketResponseDto | undefined {
    this.logger.log(`service.findOne - id=${id}`);
    const ticket = this.sampleAPIRepository.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`ticket not found`);
    }

    return {
      ...ticket,
      artist: ticket.artist ?? '',
      venue: ticket.venue ?? '',
      date: ticket.date ?? '',
      price: ticket.price ?? 0,
      description: ticket.description ?? '',
    };
  }
  create(ticket: CreateTicketDto) {
    this.logger.log(`service.create - ticket=${JSON.stringify(ticket)}`);
    // id is set to 0 as a placeholder; repository will assign the correct id
    return this.sampleAPIRepository.create({
      ...ticket,
      id: 0,
      date: ticket.date ?? null,
      artist: ticket.artist ?? null,
      venue: ticket.venue ?? null,
      price: ticket.price ?? null,
      description: ticket.description ?? null,
    });
  }
}

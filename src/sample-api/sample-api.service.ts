import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketResponseDto } from './dto/response-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ISampleAPIRepository } from './interfaces/sample-api.repository.interface';

@Injectable()
export class SampleAPIService {
  constructor(private readonly sampleAPIRepository: ISampleAPIRepository) {}

  findAll(): TicketResponseDto[] {
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

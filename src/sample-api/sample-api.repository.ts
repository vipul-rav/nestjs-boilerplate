import { Injectable, Inject, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_ORM } from '../constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../drizzle/schema';
import { ISampleAPIRepository } from './interfaces/sample-api.repository.interface';

type Ticket = typeof schema.tickets.$inferSelect;

@Injectable()
export class SampleAPIRepository implements ISampleAPIRepository {
  private tickets: Ticket[];
  private readonly dateFormat: string;
  constructor(private readonly logger: Logger) {
    //@Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>, //uncomment this line to use drizzle-orm for database operations instead of in-memory array
    this.tickets = [
      {
        id: 1,
        artist: 'Alexander Lemtov',
        venue: 'Madison Square Garden, New York',
        date: '2025-09-02',
        price: 65,
        description:
          'Join Alexander on his global tour. Alexander really needs no introduction since he has already mesmerized the world with his electronic ambient sound.',
      },
      {
        id: 2,
        artist: 'Santiago Martinez',
        venue: 'Hard Rock Live, Orlando',
        date: '2025-09-24',
        price: 135.0,
        description:
          "Experience the magic of Santiago Martinez live. Santiago's groundbreaking blend of traditional and contemporary sounds has enchanted audiences everywhere.",
      },
      {
        id: 3,
        artist: 'Miriam Johnson',
        venue: 'SoFi Stadium',
        date: '2025-10-04',
        price: 85.0,
        description:
          "Don't miss Miriam Johnson as she tours the world, bringing her soulful voice and heartfelt lyrics to life. Miriam has already touched hearts globally with her powerful and emotive performances.",
      },
    ];
    this.dateFormat = 'dd/mm/yyyy';
  }

  findAll(): Ticket[] {
    this.logger.log(
      `repository.findAll - returning ${this.tickets.length} tickets`,
    );
    return this.tickets;
  }

  findOne(id: number): Ticket | undefined {
    this.logger.log(`repository.findOne - id=${id}`);
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) {
      this.logger.warn(`repository.findOne - ticket not found id=${id}`);
    }
    return ticket;
  }
  create(ticket: Ticket) {
    this.logger.log(`repository.create - ticket incoming`);
    const newTicket = { ...ticket, id: this.tickets.length + 1 };
    this.tickets.push(newTicket);
    this.logger.log(`repository.create - created id=${newTicket.id}`);
    return newTicket;
  }
}

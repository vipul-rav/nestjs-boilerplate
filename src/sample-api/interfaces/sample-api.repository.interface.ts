import * as schema from '../../drizzle/schema';

type Ticket = typeof schema.tickets.$inferSelect;

export abstract class ISampleAPIRepository {
  abstract findAll(): Ticket[];
  abstract findOne(id: number): Ticket | undefined;
  abstract create(ticket: Ticket): Ticket;
}

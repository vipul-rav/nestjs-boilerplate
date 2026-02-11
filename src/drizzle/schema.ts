import { serial, pgTable, varchar, integer } from 'drizzle-orm/pg-core';

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  artist: varchar('artist', { length: 256 }),
  venue: varchar('venue', { length: 256 }),
  date: varchar('date', { length: 256 }),
  price: integer('price'),
  description: varchar('description', { length: 512 }),
});

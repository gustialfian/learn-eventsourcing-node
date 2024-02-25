import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { CharacterEvents } from '../character/character';


export const eventStore = sqliteTable('event_store', {
    id: integer('id').primaryKey(),
    aggregateRootId: text('aggregate_root_id'),
    data: text('data', { mode: 'json' }).$type<CharacterEvents>(),
    timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
    aggregateRootIdIdx: index('aggregate_root_id_idx').on(table.aggregateRootId),
}));

export type EventStoreInsert = typeof eventStore.$inferInsert
export type EventStoreSelect = typeof eventStore.$inferSelect
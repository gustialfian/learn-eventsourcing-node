import { DB, EventStoreInsert, eventStore } from "../db";
import type { Events } from './character';


export async function insertEventStore(db: DB, data: Events[]): Promise<void> {
    const values = data.map((x): EventStoreInsert => ({
        aggregateRootId: x.data.characterId,
        data: x,
    }))
    await db.insert(eventStore).values(values)
}
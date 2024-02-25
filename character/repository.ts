import { DB, EventStoreInsert, eventStore } from "../db";
import type { CharacterEvents } from './character';


export async function insertEventStore(db: DB, data: CharacterEvents[]): Promise<void> {
    const values = data.map((x): EventStoreInsert => ({
        aggregateRootId: x.data.characterId,
        data: x,
    }))
    await db.insert(eventStore).values(values)
}
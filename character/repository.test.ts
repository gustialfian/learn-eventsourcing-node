import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { unlink } from "fs/promises";
import t from 'tap';
import { DB, eventStore, sqlite } from '../db';
import { Events } from './character';
import { insertEventStore } from "./repository";


const dbPath = 'test-sqlite.db';
t.before(async () => {
    const db = await setupTestDB(dbPath);

    t.context.db = db;
})
t.after(async () => {
    sqlite.close()
    await unlink(dbPath)
})

t.test('character repository', async t => {
    const db: DB = t.context.db
    const data: Events = {
        type: 'CharacterCreated',
        data: {
            characterId: 'test-id',
            name: 'vidi',
        }
    }

    await insertEventStore(db, [data])

    const got = await db.select().from(eventStore)
    t.equal(got.length, 1)
    t.match(got[0], { aggregateRootId: 'test-id' })
    t.same(got[0].data, {
        type: 'CharacterCreated',
        data: {
            characterId: 'test-id',
            name: 'vidi',
        }
    })
})

async function setupTestDB(dbPath: string) {
    const sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    migrate(db, { migrationsFolder: './drizzle' });
    return db;
}

import t from 'tap';
import { DB, eventStore } from '../db';
import { setupTestDB } from '../db/test-util';
import { CharacterEvents } from './character';
import { insertEventStore } from "./repository";



t.before(async () => {
    const dbPath = `test-sqlite-${t.childId}.db`;
    const [db, dbTearDown] = await setupTestDB(dbPath);

    t.context.db = db;
    t.context.dbTearDown = dbTearDown;
})
t.after(async () => {
    await t.context.dbTearDown()
})

t.test('character repository', async t => {
    const db: DB = t.context.db
    const data: CharacterEvents = {
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


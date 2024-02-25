import { CharacterEvents } from "../character/character";
import { ulid } from 'ulidx'
import { db } from "./db";
import { eventStore } from "./schema";

const characterId = ulid();
const events: CharacterEvents[] = [
    {
        type: 'CharacterCreated',
        data: {
            characterId: characterId,
            name: 'vidi',
        }
    },
    {
        type: 'CharacterHurtAction',
        data: {
            characterId: characterId,
            point: 2,
        }
    },
    {
        type: 'CharacterHealAction',
        data: {
            characterId: characterId,
            point: 5,
        }
    },
];

(async () => {
    await db.delete(eventStore)

    const values = events.map((x): typeof eventStore.$inferInsert  => ({
        aggregateRootId: characterId,
        data: x,
    }))
    await db.insert(eventStore).values(values)

    console.log('done')
})()
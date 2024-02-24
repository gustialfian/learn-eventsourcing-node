import t from 'tap'
import * as Rpg from "./character";


t.test('simple', async t => {
    const events: [string, Rpg.Events, Rpg.Character][] = [
        [
            'CharacterCreated',
            {
                type: 'CharacterCreated',
                data: {
                    characterId: 'test-id',
                    name: 'vidi',
                }
            },
            {
                id: 'test-id',
                name: 'vidi',
                stats: {
                    hp: 10,
                    maxHp: 10,
                    str: 10,
                    dex: 10,
                }
            }
        ],
        [
            'CharacterHurtAction',
            {
                type: 'CharacterHurtAction',
                data: {
                    characterId: 'test-id',
                    point: 2,
                }
            },
            {
                id: 'test-id',
                name: 'vidi',
                stats: {
                    hp: 8,
                    maxHp: 10,
                    str: 10,
                    dex: 10,
                }
            }
        ],
        [
            'CharacterHealAction',
            {
                type: 'CharacterHealAction',
                data: {
                    characterId: 'test-id',
                    point: 5,
                }
            },
            {
                id: 'test-id',
                name: 'vidi',
                stats: {
                    hp: 10,
                    maxHp: 10,
                    str: 10,
                    dex: 10,
                }
            }
        ],
    ]

    events.reduce((xs, [msg, event, expected]) => {
        const got = Rpg.apply(event, xs)
        t.same(got, expected, msg)
        return got
    }, fakeCharacterDefault())
})


function fakeCharacterDefault(): Rpg.Character {
    return {
        id: '',
        name: '',
        stats: {
            hp: 10,
            maxHp: 10,
            str: 10,
            dex: 10,
        }
    }
}
export type Event<
    EventType extends string = string,
    EventData extends Record<string, unknown> = Record<string, unknown>,
> = Readonly<{
    type: Readonly<EventType>;
    data: Readonly<EventData>;
}>;

export type Events =
    | CharacterCreated
    | CharacterHurtAction
    | CharacterHitAction
    | CharacterHealAction
    ;

export type CharacterCreated = Event<
    'CharacterCreated',
    {
        characterId: string;
        name: string;
    }
>;

export type CharacterHurtAction = Event<
    'CharacterHurtAction',
    {
        characterId: string;
        point: number;
    }
>;

export type CharacterHitAction = Event<
    'CharacterHitAction',
    {
        characterId: string;
        point: number;
    }
>;

export type CharacterHealAction = Event<
    'CharacterHealAction',
    {
        characterId: string;
        point: number;
    }
>;

export type Character = {
    id: string;
    name: string;
    stats: CharacterStats;
}

export type CharacterStats = {
    hp: number;
    maxHp: number;
    str: number;
    dex: number;
}

export function apply({ type, data: event }: Events, state: Character): Character {
    switch (type) {
        case 'CharacterCreated':
            return {
                id: event.characterId,
                name: event.name,
                stats: {
                    hp: 10,
                    maxHp: 10,
                    str: 10,
                    dex: 10,
                }
            }
            
        case 'CharacterHurtAction':
            state.stats.hp = Math.max(state.stats.hp - event.point, 0)
            return state

        case 'CharacterHitAction':
            return state

        case 'CharacterHealAction':
            state.stats.hp = Math.min(state.stats.hp + event.point, state.stats.maxHp)
            return state

        default: {
            const _: never = type;
            throw new Error('Unknown Event Type');
        }
    }
}
export type Event<
    EventType extends string = string,
    EventData extends Record<string, unknown> = Record<string, unknown>,
> = Readonly<{
    type: Readonly<EventType>;
    data: Readonly<EventData>;
}>;

export type CharacterEvents =
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

export function applyCharacter(event: CharacterEvents, state: Character): Character {
    const { type } = event
    switch (type) {
        case 'CharacterCreated':
            return handleCharacterCreated(event)

        case 'CharacterHurtAction':
            return handleCharacterHurtAction(state, event);

        case 'CharacterHitAction':
            return handleCharacterHitAction(state, event)

        case 'CharacterHealAction':
            return handleCharacterHealAction(state, event);

        default: {
            const _: never = type;
            throw new Error('Unknown Event Type');
        }
    }
}

function handleCharacterCreated(event: CharacterCreated): Character {
    return {
        id: event.data.characterId,
        name: event.data.name,
        stats: {
            hp: 10,
            maxHp: 10,
            str: 10,
            dex: 10,
        }
    };
}

function handleCharacterHurtAction(state: Character, event: CharacterHurtAction): Character {
    state.stats.hp = Math.max(state.stats.hp - event.data.point, 0);
    return state;
}

function handleCharacterHitAction(state: Character, event: CharacterHitAction): Character {
    return state
}

function handleCharacterHealAction(state: Character, event: CharacterHealAction) {
    state.stats.hp = Math.min(state.stats.hp + event.data.point, state.stats.maxHp);
    return state;
}
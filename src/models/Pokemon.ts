export default interface Pokemon {
    id: number
    name: string
    types: TypeSlot[]
    sprites: Sprites
}

export interface TypeSlot {
    type: Type
}

export interface Type {
    name: string
}

export interface Sprites {
    other: {
        "official-artwork": {
            front_default: string
        }
    }
}

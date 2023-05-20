export default interface Pokemon {
    id: number
    name: string
    types: TypeSlot[]
}

export interface TypeSlot {
    type: Type
}

export interface Type {
    name: string
}
import Card from "./models/Card";

export default interface MyCardManager {
    getAll(): Card[]
    set(card: Card): void
}

export class DefaultMyCardManager implements MyCardManager {
    getAll(): Card[] {
        return []
    }

    set(card: Card): void {
    }
}
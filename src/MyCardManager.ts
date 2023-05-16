import Card from "./models/Card";

export default interface MyCardManager {
    getAll(): Card[]
    set(card: Card): void
}
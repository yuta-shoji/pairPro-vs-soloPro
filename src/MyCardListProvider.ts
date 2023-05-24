import Card from "./pokemonVendingMachine/models/Card";

export default interface CardListProvider {
    cards: Card[]
}

export class MyCardListProvider implements CardListProvider {
    cards: Card[] = []
}
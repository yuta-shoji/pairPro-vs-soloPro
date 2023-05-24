import MyCardListProvider from "./MyCardListProvider";
import Card from "./pokemonVendingMachine/models/Card";

export default interface MyCardManager {
    getAll(): Card[]
    set(card: Card): void
}

export class DefaultMyCardManager implements MyCardManager {
    private readonly myCardListProvider: MyCardListProvider

    constructor(myCardList: MyCardListProvider) {
        this.myCardListProvider = myCardList
    }

    getAll(): Card[] {
        return this.myCardListProvider.cards
    }

    set(card: Card): void {
        this.myCardListProvider.cards.push(card)
    }
}
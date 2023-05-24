import MyCardManager from '../MyCardManager'
import Card from "../pokemonVendingMachine/models/Card";

export default class StubMyCardManager implements MyCardManager {
    getAll_returnValue: Card[] = []
    getAll(): Card[] {
        return this.getAll_returnValue
    }

    set_argument_cards: Card[] = []
    set(card: Card): void {
        this.set_argument_cards.push(card)
    }
}
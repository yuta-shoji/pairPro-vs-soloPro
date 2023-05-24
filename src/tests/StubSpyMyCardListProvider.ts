import CardListProvider from "../MyCardListProvider";
import Card from "../pokemonVendingMachine/models/Card";

export class StubSpyMyCardListProvider implements CardListProvider {
    cards: Card[] = []
}
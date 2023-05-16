import MyCardManager from '../MyCardManager'
import Card from '../models/Card'

export default class StubMyCardManager implements MyCardManager {
    getAll_returnValue: Card[] = []
    getAll(): Card[] {
        return this.getAll_returnValue
    }

    set(card: Card): void {
    }
}
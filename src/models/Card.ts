export default interface Card {
    name: string
    id: number
}

export class CardBuilder {
    private name: string = ""
    private id: number = 0

    withName(newValue: string): CardBuilder {
        this.name = newValue
        return this
    }

    withId(newValue: number): CardBuilder {
        this.id = newValue
        return this
    }

    build(): Card {
        return {
            name: this.name,
            id: this.id,
        }
    }
}
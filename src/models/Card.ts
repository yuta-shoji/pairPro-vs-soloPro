export default interface Card {
    name: string
    id: number
    type: string[]
}

export class CardBuilder {
    private name: string = ""
    private id: number = 0
    private type: string[] = []

    withName(newValue: string): CardBuilder {
        this.name = newValue
        return this
    }

    withId(newValue: number): CardBuilder {
        this.id = newValue
        return this
    }

    withType(newValue: string[]): CardBuilder {
        this.type = newValue
        return this
    }

    build(): Card {
        return {
            name: this.name,
            id: this.id,
            type: this.type,
        }
    }
}
export default interface Card {
    name: string
    id: number
    types: string[]
    imageUrl: string
}

export class CardBuilder {
    private name: string = ""
    private id: number = 0
    private types: string[] = []
    private imageUrl: string = ""

    withName(newValue: string): CardBuilder {
        this.name = newValue
        return this
    }

    withId(newValue: number): CardBuilder {
        this.id = newValue
        return this
    }

    withTypes(newValue: string[]): CardBuilder {
        this.types = newValue
        return this
    }

    withImageUrl(newValue: string): CardBuilder {
        this.imageUrl = newValue
        return this
    }

    build(): Card {
        return {
            name: this.name,
            id: this.id,
            types: this.types,
            imageUrl: this.imageUrl
        }
    }
}
export default interface Card {
    name: string
    id: number
    types: string[]
    imageUrl: string
    weight: number
    height: number
    genus: string
    flavor_text: string
}

export class CardBuilder {
    private name: string = ""
    private id: number = 0
    private types: string[] = []
    private imageUrl: string = ""
    private weight: number = 0
    private height: number = 0
    private genus: string = ""
    private flavor_text: string = ""

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

    withWeight(newValue: number): CardBuilder {
        this.weight = newValue
        return this
    }

    withHeight(newValue: number): CardBuilder {
        this.height = newValue
        return this
    }

    withGenus(newValue: string): CardBuilder {
        this.genus = newValue
        return this
    }

    withFlavor_text(newValue: string): CardBuilder {
        this.flavor_text = newValue
        return this
    }

    build(): Card {
        return {
            name: this.name,
            id: this.id,
            types: this.types,
            imageUrl: this.imageUrl,
            weight: this.weight,
            height: this.height,
            genus: this.genus,
            flavor_text: this.flavor_text,
        }
    }
}
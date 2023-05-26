export default interface Species {
    genera: Genus[]
    flavor_text_entries: FlavorTextEntry[]
}

export interface Genus {
    genus: string
    language: Language
}

export interface FlavorTextEntry {
    flavor_text: string
}

export interface Language {
    name: string
}
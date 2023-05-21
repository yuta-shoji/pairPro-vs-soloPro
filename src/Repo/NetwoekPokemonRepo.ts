import {Http} from "../Networking/NetworkHttp";
import Pokemon from "../models/Pokemon";
import Species from "../models/Species";

export interface PokemonRepo {
    getPokemon(id: number): Promise<Pokemon>
    getSpecies(id: number): Promise<Species>
}

export class NetworkPokemonRepo implements PokemonRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async getPokemon(id: number): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        return await this.http.get(url) as Pokemon
    }

    async getSpecies(id: number): Promise<Species> {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
        return await this.http.get(url) as Species
    }
}
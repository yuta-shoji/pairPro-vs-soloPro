import {Http} from "../Networking/NetworkHttp";
import Pokemon from "../Pokemon";

export interface PokemonRepo {
    getPokemon(id: Number): Promise<Pokemon>
}

export class NetworkPokemonRepo implements PokemonRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async getPokemon(id: Number): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        return await this.http.get(url) as Pokemon
    }
}
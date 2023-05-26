import {PokemonRepo} from "../../pokemonVendingMachine/Repo/NetwoekPokemonRepo";
import Pokemon from "../../pokemonVendingMachine/models/Pokemon";
import Species from "../../pokemonVendingMachine/models/Species";

export class StubSpyPokemonRepo implements PokemonRepo {
    private defaultGetPokemonReturnValue = Promise.resolve({
        id: 0,
        name: "",
        types: [{type: {name: ""}}],
        sprites: {
            other: {
                "official-artwork": {
                    front_default: ""
                }
            }
        },
        weight: 0,
        height: 0,
    })
    getPokemon_returnValue_1st: Promise<Pokemon> = this.defaultGetPokemonReturnValue
    getPokemon_returnValue_2nd: Promise<Pokemon> = this.defaultGetPokemonReturnValue
    getPokemon_returnValue_3rd: Promise<Pokemon> = this.defaultGetPokemonReturnValue
    getPokemon_returnValue_4th: Promise<Pokemon> = this.defaultGetPokemonReturnValue
    getPokemon_returnValue_5th: Promise<Pokemon> = this.defaultGetPokemonReturnValue
    getPokemon_argument_id_1st = 0
    getPokemon_argument_id_2nd = 0
    getPokemon_argument_id_3rd = 0
    getPokemon_argument_id_4th = 0
    getPokemon_argument_id_5th = 0
    getPokemon_call_count = 0

    getPokemon(id: number): Promise<Pokemon> {
        this.getPokemon_call_count++
        return this.getPokemonSaveArgumentReturnValue(id)
    }

    private defaultGetSpeciesReturnValue = Promise.resolve({
        "genera": [
            {
                "genus": "",
                "language": {"name": ""}
            }
        ],
        "flavor_text_entries": [{"flavor_text": ""}]
    })
    getSpecies_returnValue_1st: Promise<Species> = this.defaultGetSpeciesReturnValue
    getSpecies_returnValue_2nd: Promise<Species> = this.defaultGetSpeciesReturnValue
    getSpecies_returnValue_3rd: Promise<Species> = this.defaultGetSpeciesReturnValue
    getSpecies_returnValue_4th: Promise<Species> = this.defaultGetSpeciesReturnValue
    getSpecies_returnValue_5th: Promise<Species> = this.defaultGetSpeciesReturnValue
    getSpecies_argument_id_1st = 0
    getSpecies_argument_id_2nd = 0
    getSpecies_argument_id_3rd = 0
    getSpecies_argument_id_4th = 0
    getSpecies_argument_id_5th = 0
    getSpecies_call_count = 0

    getSpecies(id: number): Promise<Species> {
        this.getSpecies_call_count++
        return this.getSpeciesSaveArgumentReturnValue(id)
    }

    private getPokemonSaveArgumentReturnValue(id: number): Promise<Pokemon> {
        if (this.getPokemon_call_count == 1) {
            this.getPokemon_argument_id_1st = id
            return this.getPokemon_returnValue_1st
        } else if (this.getPokemon_call_count == 2) {
            this.getPokemon_argument_id_2nd = id
            return this.getPokemon_returnValue_2nd
        } else if (this.getPokemon_call_count == 3) {
            this.getPokemon_argument_id_3rd = id
            return this.getPokemon_returnValue_3rd
        } else if (this.getPokemon_call_count == 4) {
            this.getPokemon_argument_id_4th = id
            return this.getPokemon_returnValue_4th
        } else if (this.getPokemon_call_count == 5) {
            this.getPokemon_argument_id_5th = id
            return this.getPokemon_returnValue_5th
        }
        else return Promise.resolve(this.defaultGetPokemonReturnValue)
    }

    private getSpeciesSaveArgumentReturnValue(id: number): Promise<Species> {
        if (this.getSpecies_call_count == 1) {
            this.getSpecies_argument_id_1st = id
            return this.getSpecies_returnValue_1st
        } else if (this.getSpecies_call_count == 2) {
            this.getSpecies_argument_id_2nd = id
            return this.getSpecies_returnValue_2nd
        } else if (this.getSpecies_call_count == 3) {
            this.getSpecies_argument_id_3rd = id
            return this.getSpecies_returnValue_3rd
        } else if (this.getSpecies_call_count == 4) {
            this.getSpecies_argument_id_4th = id
            return this.getSpecies_returnValue_4th
        } else if (this.getSpecies_call_count == 5) {
            this.getSpecies_argument_id_5th = id
            return this.getSpecies_returnValue_5th
        }
        else return Promise.resolve(this.defaultGetSpeciesReturnValue)
    }
}
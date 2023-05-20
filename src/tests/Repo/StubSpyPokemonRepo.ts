import {PokemonRepo} from "../../Repo/NetwoekPokemonRepo";
import Pokemon from "../../Pokemon";

export class StubSpyPokemonRepo implements PokemonRepo {
    private defaultReturnValue = Promise.resolve({
        id: 0,
        name: "",
        types: [{type: {name: ""}}]
    })
    getPokemon_returnValue_1st: Promise<Pokemon> = this.defaultReturnValue
    getPokemon_returnValue_2nd: Promise<Pokemon> = this.defaultReturnValue
    getPokemon_returnValue_3rd: Promise<Pokemon> = this.defaultReturnValue
    getPokemon_returnValue_4th: Promise<Pokemon> = this.defaultReturnValue
    getPokemon_returnValue_5th: Promise<Pokemon> = this.defaultReturnValue
    get_argument_id_1st: number = 0;
    get_argument_id_2nd: number = 0;
    get_argument_id_3rd: number = 0;
    get_argument_id_4th: number = 0;
    get_argument_id_5th: number = 0;
    get_call_count: number = 0;

    getPokemon(id: number): Promise<Pokemon> {
        this.get_call_count++
        this.saveArgument(id)
        return this.returnValue()
    }

    private saveArgument(id: number) {
        if (this.get_call_count == 1) {
            this.get_argument_id_1st = id
        } else if (this.get_call_count == 2) {
            this.get_argument_id_2nd = id
        } else if (this.get_call_count == 3) {
            this.get_argument_id_3rd = id
        } else if (this.get_call_count == 4) {
            this.get_argument_id_4th = id
        } else if (this.get_call_count == 5) {
            this.get_argument_id_5th = id
        }
    }

    private returnValue(): Promise<Pokemon> {
        if (this.get_call_count == 1) {
            return this.getPokemon_returnValue_1st
        } else if (this.get_call_count == 2) {
            return this.getPokemon_returnValue_2nd
        } else if (this.get_call_count == 3) {
            return this.getPokemon_returnValue_3rd
        } else if (this.get_call_count == 4) {
            return this.getPokemon_returnValue_4th
        } else if (this.get_call_count == 5) {
            return this.getPokemon_returnValue_5th
        }
        else return Promise.resolve(this.defaultReturnValue)
    }
}
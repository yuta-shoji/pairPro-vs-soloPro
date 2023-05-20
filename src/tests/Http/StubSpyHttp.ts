import {Http} from "../../Networking/NetworkHttp";

export class StubSpyHttp implements Http {
    get_returnValue: Promise<object> = Promise.resolve({})
    getPokemon_argument_url?: string = undefined

    get(url: string): Promise<object> {
        this.getPokemon_argument_url = url
        return this.get_returnValue
    }
}
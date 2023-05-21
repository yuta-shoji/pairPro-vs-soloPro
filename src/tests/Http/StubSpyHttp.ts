import {Http} from "../../Networking/NetworkHttp";

export class StubSpyHttp implements Http {
    get_returnValue: Promise<object> = Promise.resolve({})
    get_argument_url?: string = undefined

    get(url: string): Promise<object> {
        this.get_argument_url = url
        return this.get_returnValue
    }
}
import axios from "axios"

export interface Http {
    get(url: string): Promise<object>
}

export class NetworkHttp implements Http {
    async get(url: string): Promise<object> {
        const response = await axios.get(url)
        return Promise.resolve(response.data)
    }
}
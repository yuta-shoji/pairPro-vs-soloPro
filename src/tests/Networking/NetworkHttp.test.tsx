import axios from "axios";
import {Http, NetworkHttp} from "../../pokemonVendingMachine/Networking/NetworkHttp";

describe('NetworkHttp', () => {
    describe('get requests', () => {
        let networkHttp: Http

        afterEach(() => jest.restoreAllMocks())

        beforeEach(() => {
            axios.get = jest.fn(() =>
                Promise.resolve({
                    data: {test: '100'}
                })
            ) as jest.Mock

            networkHttp = new NetworkHttp()
        })

        test("axiosに正しくurlの引数を渡している", async () => {
            await networkHttp.get('https://pokeapi.co/api/v2/pokemon/10')


            expect(axios.get).lastCalledWith('https://pokeapi.co/api/v2/pokemon/10')
        })

        test('axiosが正しくresponseのJSONを返す', async () => {
            const response = await networkHttp.get('')


            expect(response).toEqual({test: '100'})
        })
    })
})

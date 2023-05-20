import {NetworkPokemonRepo, PokemonRepo} from "../../Repo/NetwoekPokemonRepo";
import {StubSpyHttp} from "../Http/StubSpyHttp";

describe('NetworkPokemonRepoの', () => {
    let stubSpyNetworkHttp: StubSpyHttp
    let networkPokemonRepo: PokemonRepo

    beforeEach(() => {
        stubSpyNetworkHttp = new StubSpyHttp()
        networkPokemonRepo = new NetworkPokemonRepo(stubSpyNetworkHttp)
    })

    describe('getPokemonは', () => {
        test('HTTPが返すポケモンのJSONをparseして返す', async () => {
            stubSpyNetworkHttp.get_returnValue = Promise.resolve({
                "id": 10,
                "name": "hoge",
                "types": [
                    {"type": {"name": ""}}
                ]
            })


            const actualPokemon = await networkPokemonRepo.getPokemon(0)
            const expectedPokemon = {
                id: 10,
                name: "hoge",
                types: [
                    {type: {name: ""}}
                ]
            }


            expect(actualPokemon).toEqual(expectedPokemon)
        })

        test("httpに正しいurlを渡して実行している", async () => {
            await networkPokemonRepo.getPokemon(10)


            expect(stubSpyNetworkHttp.getPokemon_argument_url).toEqual("https://pokeapi.co/api/v2/pokemon/10")
        })

        test("再度別のidで呼ばれた時もhttpに正しいurlを渡して実行している", async () => {
            await networkPokemonRepo.getPokemon(11)


            expect(stubSpyNetworkHttp.getPokemon_argument_url).toEqual("https://pokeapi.co/api/v2/pokemon/11")
        })
    })
})
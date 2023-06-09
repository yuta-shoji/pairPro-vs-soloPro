import {StubSpyHttp} from "../Networking/StubSpyHttp";
import {NetworkPokemonRepo, PokemonRepo} from "../../pokemonVendingMachine/Repo/NetwoekPokemonRepo";

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
                ],
                "sprites": {
                    "other": {
                        "official-artwork": {
                            "front_default": ""
                        }
                    }
                },
                weight: 100,
                height: 200
            })


            const actualPokemon = await networkPokemonRepo.getPokemon(0)
            const expectedPokemon = {
                id: 10,
                name: "hoge",
                types: [
                    {type: {name: ""}}
                ],
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: ""
                        }
                    }
                },
                weight: 100,
                height: 200
            }


            expect(actualPokemon).toEqual(expectedPokemon)
        })

        test("httpに正しいurlを渡して実行している", async () => {
            await networkPokemonRepo.getPokemon(10)


            expect(stubSpyNetworkHttp.get_argument_url).toEqual("https://pokeapi.co/api/v2/pokemon/10")
        })

        test("再度別のidで呼ばれた時もhttpに正しいurlを渡して実行している", async () => {
            await networkPokemonRepo.getPokemon(11)


            expect(stubSpyNetworkHttp.get_argument_url).toEqual("https://pokeapi.co/api/v2/pokemon/11")
        })
    })

    describe('getSpeciesは', () => {
        test('HTTPが返すSpeciesのJSONをparseして返す', async () => {
            stubSpyNetworkHttp.get_returnValue = Promise.resolve({
                "genera": [{"genus": "たねポケモン"}],
                "flavor_text_entries": [
                    {"flavor_text": "flavor-text1"},
                    {"flavor_text": "flavor-text2"},
                ]
            })


            const actualSpecies = await networkPokemonRepo.getSpecies(0)
            const expectSpecies = {
                genera: [{genus: "たねポケモン"}],
                flavor_text_entries: [
                    {flavor_text: "flavor-text1"},
                    {flavor_text: "flavor-text2"},
                ]
            }


            expect(actualSpecies).toEqual(expectSpecies)
        })

        test('HTTPに正しいurlを渡して実行している', async () => {
            await networkPokemonRepo.getSpecies(123)


            expect(stubSpyNetworkHttp.get_argument_url).toEqual('https://pokeapi.co/api/v2/pokemon-species/123')
        })

        test('再度別のidで呼ばれた時もHTTPに正しいurlを渡して実行している', async () => {
            await networkPokemonRepo.getSpecies(456)


            expect(stubSpyNetworkHttp.get_argument_url).toEqual('https://pokeapi.co/api/v2/pokemon-species/456')
        })
    })
})
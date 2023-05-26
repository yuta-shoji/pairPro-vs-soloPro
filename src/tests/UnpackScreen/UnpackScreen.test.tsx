import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import userEvent from "@testing-library/user-event";
import {AppProps} from "../../App";
import AppPropsBuilder from "../../AppPropsBuilder";
import {StubSpyPokemonRepo} from "../Repo/StubSpyPokemonRepo";
import resolveAwaitingPromises, {asyncClick} from "../PromiseProcessing";
import {StubRandomNumberProvider} from "../StubRandomNumberProvider";
import StubMyCardManager from "../StubMyCardManager";

describe('開封画面', () => {
    let appProps: AppProps
    let stubSpyPokemonRepo: StubSpyPokemonRepo
    let stubRandomNumberProvider: StubRandomNumberProvider
    let stubMyCardManager: StubMyCardManager

    beforeEach(() => {
        stubSpyPokemonRepo = new StubSpyPokemonRepo()
        stubRandomNumberProvider = new StubRandomNumberProvider()
        stubMyCardManager = new StubMyCardManager()
        appProps = new AppPropsBuilder()
            .withPokemonRepo(stubSpyPokemonRepo)
            .withRandomNumberProvider(stubRandomNumberProvider)
            .withMyCardManager(stubMyCardManager)
            .build()
    })

    test('Buy New Packボタンを押すと、購入画面に遷移する', async () => {
        await renderApplication('/open', appProps)


        expect(screen.queryByText('¥260')).toBeNull()


        const buyNewPackButton = screen.getByText('Buy New Pack')
        userEvent.click(buyNewPackButton)
        await resolveAwaitingPromises()


        expect(screen.getByText('¥260')).toBeInTheDocument()
    })

    test('開封画面を開いた時、初期状態でカードが5枚見える', async () => {
        await renderApplication('/open', appProps)


        const questionMarks = screen.getAllByTitle('cardFront')
        expect(questionMarks.length).toEqual(5)
    })

    test('描画時にpokemonRepoのgetPokemonとgetSpeciesを合計5回ずつ呼ぶ', async () => {
        await renderApplication('/open', appProps)


        expect(stubSpyPokemonRepo.getPokemon_call_count).toEqual(5)
        expect(stubSpyPokemonRepo.getSpecies_call_count).toEqual(5)
    })

    test('描画時にRandomNumberProviderのrandomを5回呼ぶ', async () => {
        await renderApplication('/open', appProps)


        expect(stubRandomNumberProvider.get_call_count).toEqual(5)
    })

    test('randomNumberProviderの返り値をgetPokemonにそれぞれ渡して5回実行している', async () => {
        stubRandomNumberProvider.random_returnValue_1st = 110
        stubRandomNumberProvider.random_returnValue_2nd = 120
        stubRandomNumberProvider.random_returnValue_3rd = 130
        stubRandomNumberProvider.random_returnValue_4th = 140
        stubRandomNumberProvider.random_returnValue_5th = 150
        await renderApplication('/open', appProps)


        expect(stubSpyPokemonRepo.getPokemon_argument_id_1st).toEqual(110)
        expect(stubSpyPokemonRepo.getPokemon_argument_id_2nd).toEqual(120)
        expect(stubSpyPokemonRepo.getPokemon_argument_id_3rd).toEqual(130)
        expect(stubSpyPokemonRepo.getPokemon_argument_id_4th).toEqual(140)
        expect(stubSpyPokemonRepo.getPokemon_argument_id_5th).toEqual(150)
    })

    test('randomNumberProviderの返り値をgetSpeciesにそれぞれ渡して5回実行している', async () => {
        stubRandomNumberProvider.random_returnValue_1st = 210
        stubRandomNumberProvider.random_returnValue_2nd = 220
        stubRandomNumberProvider.random_returnValue_3rd = 230
        stubRandomNumberProvider.random_returnValue_4th = 240
        stubRandomNumberProvider.random_returnValue_5th = 250
        await renderApplication('/open', appProps)


        expect(stubSpyPokemonRepo.getSpecies_argument_id_1st).toEqual(210)
        expect(stubSpyPokemonRepo.getSpecies_argument_id_2nd).toEqual(220)
        expect(stubSpyPokemonRepo.getSpecies_argument_id_3rd).toEqual(230)
        expect(stubSpyPokemonRepo.getSpecies_argument_id_4th).toEqual(240)
        expect(stubSpyPokemonRepo.getSpecies_argument_id_5th).toEqual(250)
    })

    test('pokemonRepoが返す値を表示する', async () => {
        setStubSpyPokemonRepo()
        await renderApplication('/open', appProps)


        const imageUrls = screen.queryAllByAltText('pokemonImage') as HTMLImageElement[]
        expect(screen.getByText('#6')).toBeInTheDocument()
        expect(screen.getByText('charizard')).toBeInTheDocument()
        expect(screen.getByText('fire,flying')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[0], 'https://charizard.png')

        expect(screen.getByText('#23')).toBeInTheDocument()
        expect(screen.getByText('ekans')).toBeInTheDocument()
        expect(screen.getByText('poison')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[1], 'https://ekans.png')

        expect(screen.getByText('#86')).toBeInTheDocument()
        expect(screen.getByText('seel')).toBeInTheDocument()
        expect(screen.getByText('water')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[2], 'https://seel.png')

        expect(screen.getByText('#161')).toBeInTheDocument()
        expect(screen.getByText('sentret')).toBeInTheDocument()
        expect(screen.getByText('normal')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[3], 'https://sentret.png')

        expect(screen.getByText('#377')).toBeInTheDocument()
        expect(screen.getByText('regirock')).toBeInTheDocument()
        expect(screen.getByText('rock')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[4], 'https://regirock.png')
    })

    test('getしたカードをmyCardManagerに渡している', async () => {
        setStubSpyPokemonRepo()
        await renderApplication('/open', appProps)


        const myCards = stubMyCardManager.set_argument_cards
        expect(myCards.length).toEqual(5)
        expect(myCards[0]).toEqual({
            id: 6,
            name: 'charizard',
            types: ['fire', 'flying'],
            imageUrl: "https://charizard.png",
            weight: 60,
            height: 600,
            genus: "genus1",
            flavor_text: "flavorText1",
        })
        expect(myCards[1]).toEqual({
            id: 23,
            name: 'ekans',
            types: ['poison'],
            imageUrl: "https://ekans.png",
            weight: 230,
            height: 2300,
            genus: "genus2",
            flavor_text: "flavorText2",
        })
        expect(myCards[2]).toEqual({
            id: 86,
            name: 'seel',
            types: ['water'],
            imageUrl: "https://seel.png",
            weight: 860,
            height: 8600,
            genus: "genus3",
            flavor_text: "flavorText3",
        })
        expect(myCards[3]).toEqual({
            id: 161,
            name: 'sentret',
            types: ['normal'],
            imageUrl: "https://sentret.png",
            weight:  1610,
            height: 16100,
            genus: "genus4",
            flavor_text: "flavorText4",
        })
        expect(myCards[4]).toEqual({
            id: 377,
            name: 'regirock',
            types: ['rock'],
            imageUrl: "https://regirock.png",
            weight:  3770,
            height: 37700,
            genus: "genus5",
            flavor_text: "flavorText5",
        })
    })

    test('genusの言語が英語のものを使用してmyCardManagerに渡す', async () => {
        stubSpyPokemonRepo.getSpecies_returnValue_1st = Promise.resolve({
            genera: [
                {
                    genus: "genus1",
                    language: {
                        name: "ja"
                    }
                },
                {
                    genus: "genus2",
                    language: {
                        name: "en"
                    }
                },
                {
                    genus: "genus3",
                    language: {
                        name: "ko"
                    }
                },
            ],
            flavor_text_entries: [{flavor_text: ""}]
        })
        await renderApplication('/open', appProps)

        const myCards = stubMyCardManager.set_argument_cards
        expect(myCards.length).toEqual(5)
        expect(myCards[0].genus).toEqual("genus2")
    })

    test('説明文が複数ある場合一番最初の説明文を使う', async () => {
        stubSpyPokemonRepo.getSpecies_returnValue_1st = Promise.resolve({
            genera: [
                {
                    genus: "genus1",
                    language: {name: "ja"}
                }
            ],
            flavor_text_entries: [
                {flavor_text: "flavor_text 1"},
                {flavor_text: "flavor_text 2"},
                {flavor_text: "flavor_text 3"},
                {flavor_text: "flavor_text 4"},
            ]
        })
        await renderApplication('/open', appProps)

        const myCards = stubMyCardManager.set_argument_cards
        expect(myCards.length).toEqual(5)
        expect(myCards[0].flavor_text).toEqual("flavor_text 1")
    })

    test('説明文がない場合空文字列を保存する', async () => {
        stubSpyPokemonRepo.getSpecies_returnValue_1st = Promise.resolve({
            genera: [
                {
                    genus: "genus1",
                    language: {name: "ja"}
                }
            ],
            flavor_text_entries: []
        })
        await renderApplication('/open', appProps)

        const myCards = stubMyCardManager.set_argument_cards
        expect(myCards.length).toEqual(5)
        expect(myCards[0].flavor_text).toEqual("")
    })

    test('カードの表面をクリックすると詳細画面に遷移する', async () => {
        setStubSpyPokemonRepo()
        await renderApplication('/open', appProps)


        expect(screen.queryByText('genu1')).toBeNull()

        await asyncClick(screen.getAllByTitle('cardBack')[0])
        await asyncClick(screen.getByText('#6'))


        expect(screen.getByText('genus1')).toBeInTheDocument()
        expect(screen.getByText('flavorText1')).toBeInTheDocument()
    })

    function setStubSpyPokemonRepo() {
        stubSpyPokemonRepo.getPokemon_returnValue_1st = Promise.resolve({
            id: 6,
            name: 'charizard',
            types: [{type: {name: 'fire'}}, {type: {name: 'flying'}}],
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://charizard.png"
                    }
                }
            },
            weight: 60,
            height: 600,
        })
        stubSpyPokemonRepo.getPokemon_returnValue_2nd = Promise.resolve({
            id: 23,
            name: 'ekans',
            types: [{type: {name: 'poison'}}],
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://ekans.png"
                    }
                }
            },
            weight: 230,
            height: 2300,
        })
        stubSpyPokemonRepo.getPokemon_returnValue_3rd = Promise.resolve({
            id: 86,
            name: 'seel',
            types: [{type: {name: 'water'}}],
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://seel.png"
                    }
                }
            },
            weight: 860,
            height: 8600,
        })
        stubSpyPokemonRepo.getPokemon_returnValue_4th = Promise.resolve({
            id: 161,
            name: 'sentret',
            types: [{type: {name: 'normal'}}],
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://sentret.png"
                    }
                }
            },
            weight: 1610,
            height: 16100,
        })
        stubSpyPokemonRepo.getPokemon_returnValue_5th = Promise.resolve({
            id: 377,
            name: 'regirock',
            types: [{type: {name: 'rock'}}],
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://regirock.png"
                    }
                }
            },
            weight: 3770,
            height: 37700,
        })

        stubSpyPokemonRepo.getSpecies_returnValue_1st = Promise.resolve({
            genera: [
                {
                    genus: "genus1",
                    language: {
                        name: "en"
                    }
                }
            ],
            flavor_text_entries: [{flavor_text: "flavorText1"}]
        })
        stubSpyPokemonRepo.getSpecies_returnValue_2nd = Promise.resolve({
            genera: [
                {
                    genus: "genus2",
                    language: {
                        name: "en"
                    }
                }
            ],
            flavor_text_entries: [{flavor_text: "flavorText2"}]
        })
        stubSpyPokemonRepo.getSpecies_returnValue_3rd = Promise.resolve({
            genera: [
                {
                    genus: "genus3",
                    language: {
                        name: "en"
                    }
                }
            ],
            flavor_text_entries: [{flavor_text: "flavorText3"}]
        })
        stubSpyPokemonRepo.getSpecies_returnValue_4th = Promise.resolve({
            genera: [
                {
                    genus: "genus4",
                    language: {
                        name: "en"
                    }
                }
            ],
            flavor_text_entries: [{flavor_text: "flavorText4"}]
        })
        stubSpyPokemonRepo.getSpecies_returnValue_5th = Promise.resolve({
            genera: [
                {
                    genus: "genus5",
                    language: {
                        name: "en"
                    }
                }
            ],
            flavor_text_entries: [{flavor_text: "flavorText5"}]
        })
    }

    function assertImageUrlExists(element: HTMLImageElement, src: string) {
        expect(element.src).toContain(src)
        expect(element.tagName).toEqual('IMG')
    }
})

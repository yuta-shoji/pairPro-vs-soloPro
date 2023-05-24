import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import userEvent from "@testing-library/user-event";
import {AppProps} from "../../App";
import AppPropsBuilder from "../../AppPropsBuilder";
import {StubSpyPokemonRepo} from "../Repo/StubSpyPokemonRepo";
import resolveAwaitingPromises from "../PromiseProcessing";
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

    test('描画時にpokemonRepoのgetPokemonを5回呼ぶ', async () => {
        await renderApplication('/open', appProps)


        expect(stubSpyPokemonRepo.getPokemon_call_count).toEqual(5)
    })

    test('描画時にRandomNumberProviderのrandomを5回呼ぶ', async () => {
        await renderApplication('/open', appProps)


        expect(stubRandomNumberProvider.get_call_count).toEqual(5)
    })

    test('randomNumberProviderの返り値をpokemonRepoのgetPokemonにそれぞれ渡して5回実行している', async () => {
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
        })
        expect(myCards[1]).toEqual({
            id: 23,
            name: 'ekans',
            types: ['poison'],
            imageUrl: "https://ekans.png",
        })
        expect(myCards[2]).toEqual({
            id: 86,
            name: 'seel',
            types: ['water'],
            imageUrl: "https://seel.png",
        })
        expect(myCards[3]).toEqual({
            id: 161,
            name: 'sentret',
            types: ['normal'],
            imageUrl: "https://sentret.png",
        })
        expect(myCards[4]).toEqual({
            id: 377,
            name: 'regirock',
            types: ['rock'],
            imageUrl: "https://regirock.png",
        })
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
        })
    }

    function assertImageUrlExists(element: HTMLImageElement, src: string) {
        expect(element.src).toContain(src)
        expect(element.tagName).toEqual('IMG')
    }
})
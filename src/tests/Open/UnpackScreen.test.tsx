import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import userEvent from "@testing-library/user-event";
import {AppProps} from "../../App";
import AppPropsBuilder from "../../AppPropsBuilder";
import {StubSpyPokemonRepo} from "../Repo/StubSpyPokemonRepo";
import resolveAwaitingPromises, {asyncClick} from "../PromiseProcessing";
import {StubRandomNumberProvider} from "../StubRandomNumberProvider";

describe('開封画面', () => {
    let appProps: AppProps
    let stubSpyPokemonRepo: StubSpyPokemonRepo
    let stubRandomNumberProvider: StubRandomNumberProvider

    beforeEach(() => {
        stubSpyPokemonRepo = new StubSpyPokemonRepo()
        stubRandomNumberProvider = new StubRandomNumberProvider()
        appProps = new AppPropsBuilder()
            .withPokemonRepo(stubSpyPokemonRepo)
            .withRandomNumberProvider(stubRandomNumberProvider)
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

    test('開封画面を開いた時、初期状態で「？」が5こ見える', async () => {
        await renderApplication('/open', appProps)


        const questionMarks = screen.getAllByText('?')
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
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText(6)).toBeNull()
        expect(screen.queryByText('charizard')).toBeNull()
        expect(screen.queryByText('fire,flying')).toBeNull()

        expect(screen.queryByText(23)).toBeNull()
        expect(screen.queryByText('ekans')).toBeNull()
        expect(screen.queryByText('poison')).toBeNull()

        expect(screen.queryByText(86)).toBeNull()
        expect(screen.queryByText('seel')).toBeNull()
        expect(screen.queryByText('water')).toBeNull()

        expect(screen.queryByText(161)).toBeNull()
        expect(screen.queryByText('sentret')).toBeNull()
        expect(screen.queryByText('normal')).toBeNull()

        expect(screen.queryByText(377)).toBeNull()
        expect(screen.queryByText('regirock')).toBeNull()
        expect(screen.queryByText('rock')).toBeNull()


        await asyncClick(questionMarks[0])
        await asyncClick(questionMarks[1])
        await asyncClick(questionMarks[2])
        await asyncClick(questionMarks[3])
        await asyncClick(questionMarks[4])


        const imageUrls = screen.queryAllByAltText('pokemonImage') as HTMLImageElement[]
        expect(screen.getByText(6)).toBeInTheDocument()
        expect(screen.getByText('charizard')).toBeInTheDocument()
        expect(screen.getByText('fire,flying')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[0], 'https://charizard.png')

        expect(screen.getByText(23)).toBeInTheDocument()
        expect(screen.getByText('ekans')).toBeInTheDocument()
        expect(screen.getByText('poison')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[1], 'https://ekans.png')

        expect(screen.getByText(86)).toBeInTheDocument()
        expect(screen.getByText('seel')).toBeInTheDocument()
        expect(screen.getByText('water')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[2], 'https://seel.png')

        expect(screen.getByText(161)).toBeInTheDocument()
        expect(screen.getByText('sentret')).toBeInTheDocument()
        expect(screen.getByText('normal')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[3], 'https://sentret.png')

        expect(screen.getByText(377)).toBeInTheDocument()
        expect(screen.getByText('regirock')).toBeInTheDocument()
        expect(screen.getByText('rock')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[4], 'https://regirock.png')
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

import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import StubMyCardManager from '../StubMyCardManager'
import AppPropsBuilder from '../../AppPropsBuilder'
import {AppProps} from "../../App";
import {StubSpyPokemonRepo} from "../Repo/StubSpyPokemonRepo";
import {StubRandomNumberProvider} from "../StubRandomNumberProvider";

describe('カードリスト画面', () => {
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

    test('過去にGetしたポケモンのID、名前、タイプ、画像が一覧で表示されている', async () => {
        stubMyCardManager.getAll_returnValue = [
            {id: 1, name: "name1", types: ["type1"], imageUrl: "https://image1.png" ,weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 2, name: "name2", types: ["type2"], imageUrl: "https://image2.png" ,weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 3, name: "name3", types: ["type3", "type4"], imageUrl: "https://image3.png" ,weight: 0, height: 0, genus: "", flavor_text: ""},
        ]
        await renderApplication('my-card', appProps)


        const imageUrls = screen.queryAllByAltText('pokemonImage') as HTMLImageElement[]
        expect(screen.getByText('#1')).toBeInTheDocument()
        expect(screen.getByText('name1')).toBeInTheDocument()
        expect(screen.getByText('type1')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[0], 'https://image1.png')

        expect(screen.getByText('#2')).toBeInTheDocument()
        expect(screen.getByText('name2')).toBeInTheDocument()
        expect(screen.getByText('type2')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[1], 'https://image2.png')

        expect(screen.getByText('#3')).toBeInTheDocument()
        expect(screen.getByText('name3')).toBeInTheDocument()
        expect(screen.getByText('type3,type4')).toBeInTheDocument()
        assertImageUrlExists(imageUrls[2], 'https://image3.png')
    })

    test('保有するカードの枚数が表示される', async () => {
        stubMyCardManager.getAll_returnValue = [
            {id: 6, name: 'charizard', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 23, name: 'ekans', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 86, name: 'seel', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
        ]

        expect(screen.queryByText('全3枚')).toBeNull()
        await renderApplication('/my-card', appProps)


        expect(screen.getByText('全3枚')).toBeInTheDocument()
    })

    test('再度開いても保有するカードの枚数が正しく表示される', async () => {
        stubMyCardManager.getAll_returnValue = [
            {id: 6, name: 'charizard', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 23, name: 'ekans', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 86, name: 'seel', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 161, name: 'sentret', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
            {id: 377, name: 'regirock', types: [], imageUrl: "", weight: 0, height: 0, genus: "", flavor_text: ""},
        ]

        expect(screen.queryByText('全5枚')).toBeNull()
        await renderApplication('/my-card', appProps)


        expect(screen.getByText('全5枚')).toBeInTheDocument()
    })

    function assertImageUrlExists(element: HTMLImageElement, src: string) {
        expect(element.src).toContain(src)
        expect(element.tagName).toEqual('IMG')
    }
})
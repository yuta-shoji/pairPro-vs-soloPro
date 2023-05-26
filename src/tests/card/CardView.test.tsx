import {render, screen} from '@testing-library/react'
import {asyncClick} from "../PromiseProcessing";
import Card from "../../pokemonVendingMachine/models/Card";
import RotateCardView from "../../pokemonVendingMachine/card/RotateCardView";

describe('RotateCardView', () => {
    test('カードの裏面をクリックするとカードが裏返り、ポケモンの情報が表示される', async () => {
        const card: Card = {
            id: 1,
            name: "bulbasaur",
            types: ["grass"],
            imageUrl: "https://hoge.png",
            weight: 0,
            height: 0,
            genus: "",
            flavor_text: ""
        }
        render(<RotateCardView card={card}/>)


        expect(screen.getByTitle('cardFront')).not.toHaveClass('turnOverCardFront')


        await asyncClick(screen.getByTitle('cardBack'))


        expect(screen.getByTitle('cardFront')).toHaveClass('turnOverCardFront')
        expect(screen.getByText('#1')).toBeInTheDocument()
        expect(screen.getByText('bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('grass')).toBeInTheDocument()
        const pokemonImage = screen.queryByAltText('pokemonImage') as HTMLImageElement
        expect(pokemonImage.src).toContain("https://hoge.png")
        expect(pokemonImage.tagName).toEqual('IMG')
    })

    test('typeが複数あるポケモンの場合は全てのタイプをカンマ区切りで表示する', async () => {
        const card: Card = {
            id: 1,
            name: "bulbasaur",
            types: ["grass", "water"],
            imageUrl: "",
            weight: 0,
            height: 0,
            genus: "",
            flavor_text: "",
        }
        render(<RotateCardView card={card}/>)


        expect(screen.getByText('grass,water')).toBeInTheDocument()
    })
})
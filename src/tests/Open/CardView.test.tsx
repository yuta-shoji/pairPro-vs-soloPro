import {render, screen} from '@testing-library/react'
import CardView from "../../Open/CardView";
import Card from "../../models/Card";
import {asyncClick} from "../PromiseProcessing";

describe('CardView', () => {
    test('カードの裏面をクリックするとカードが裏返り、ポケモンの情報が表示される', async () => {
        const card: Card = {
            id: 1,
            name: "bulbasaur",
            type: ["grass"],
            imageUrl: "https://hoge.png"
        }
        render(<CardView card={card}/>)


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
        const card: Card = {id: 1, name: "bulbasaur", type: ["grass", "water"], imageUrl: ""}
        render(<CardView card={card}/>)


        expect(screen.getByText('grass,water')).toBeInTheDocument()
    })
})
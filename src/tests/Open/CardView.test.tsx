import {screen} from '@testing-library/react'
import {render} from "@testing-library/react";
import CardView from "../../Open/CardView";
import Card from "../../models/Card";
import {asyncClick} from "../PromiseProcessing";

describe('CardView', () => {
    test('デフォルトで?が一つ表示される', () => {
        const card: Card = {id: 1, name: "", type: []}
        render(<CardView card={card} />)


        const questionMark = screen.getByText('?')
        expect(questionMark).toBeInTheDocument()
    })

    test('?をクリックするとCardが表示され、?は非表示になる', async () => {
        const card: Card = {id: 1, name: "bulbasaur", type: ["grass"]}
        render(<CardView card={card}/>)


        expect(screen.queryByText('1')).toBeNull()
        expect(screen.queryByText('bulbasaur')).toBeNull()
        expect(screen.queryByText('grass')).toBeNull()


        const questionMark = screen.getByText('?')
        await asyncClick(questionMark)


        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('grass')).toBeInTheDocument()
        expect(screen.queryByText('?')).toBeNull()
    })

    test('typeが複数あるポケモンの場合は全てのタイプをカンマ区切りで表示する', async () => {
        const card: Card = {id: 1, name: "bulbasaur", type: ["grass", "water"]}
        render(<CardView card={card}/>)


        await asyncClick(screen.getByText('?'))
        expect(screen.getByText('grass,water')).toBeInTheDocument()
    })
})
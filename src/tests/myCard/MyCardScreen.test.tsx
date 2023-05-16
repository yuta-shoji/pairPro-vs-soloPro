import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import StubMyCardManager from '../StubMyCardManager'
import AppPropsBuilder from '../../AppPropsBuilder'
import {CardBuilder} from '../../models/Card'

describe('カードリスト画面', () => {
    test('過去にGetしたポケモンのIDが一覧で表示されている', async () => {
        let stubMyCardManager = new StubMyCardManager()
        stubMyCardManager.getAll_returnValue = [
            (new CardBuilder()).withId(999).build(),
            (new CardBuilder()).withId(888).build(),
            (new CardBuilder()).withId(777).build(),
        ]
        let appProps = (new AppPropsBuilder()).withMyCardManager(stubMyCardManager).build()


        await renderApplication('my-card', appProps)


        expect(screen.getByText("999")).toBeInTheDocument()
        expect(screen.getByText("888")).toBeInTheDocument()
        expect(screen.getByText("777")).toBeInTheDocument()
    })
})
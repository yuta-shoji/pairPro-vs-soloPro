import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import userEvent from "@testing-library/user-event";
import resolveAwaitingPromises from "../../PromiseProcessing";

describe('開封画面', () => {
    test('開封画面を開いた時、初期状態で「？」が5こ見える', async () => {
        await renderApplication('/open')


        const questionMarks = screen.getAllByText('?')
        expect(questionMarks.length).toEqual(5)
    })

    test('一つ目の「?」を押した時、「bulbasaur」の文字が見える', async () => {
        await renderApplication('/open')
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText('bulbasaur')).toBeNull()


        userEvent.click(questionMarks[0])
        await resolveAwaitingPromises()


        expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })

    test('2つ目の「?」を押した時、「ivysaur」の文字が見える', async () => {
        await renderApplication('/open')
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText('ivysaur')).toBeNull()


        userEvent.click(questionMarks[1])
        await resolveAwaitingPromises()


        expect(screen.getByText('ivysaur')).toBeInTheDocument()
    })

    test('3つ目の「?」を押した時、「venusaur」の文字が見える', async () => {
        await renderApplication('/open')
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText('venusaur')).toBeNull()


        userEvent.click(questionMarks[2])
        await resolveAwaitingPromises()


        expect(screen.getByText('venusaur')).toBeInTheDocument()
    })

    test('4つ目の「?」を押した時、「charmander」の文字が見える', async () => {
        await renderApplication('/open')
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText('charmander')).toBeNull()


        userEvent.click(questionMarks[3])
        await resolveAwaitingPromises()


        expect(screen.getByText('charmander')).toBeInTheDocument()
    })

    test('5つ目の「?」を押した時、「charmeleon」の文字が見える', async () => {
        await renderApplication('/open')
        const questionMarks = screen.getAllByText('?')


        expect(screen.queryByText('charmeleon')).toBeNull()


        userEvent.click(questionMarks[4])
        await resolveAwaitingPromises()


        expect(screen.getByText('charmeleon')).toBeInTheDocument()
    })

    test('Buy New Packボタンを押すと、購入画面に遷移する', async () => {
        await renderApplication('/open')


        expect(screen.queryByText('¥260')).toBeNull()


        const buyNewPackButton = screen.getByText('Buy New Pack')
        userEvent.click(buyNewPackButton)
        await resolveAwaitingPromises()


        expect(screen.getByText('¥260')).toBeInTheDocument()
    })
})


// bulbasaur
// ivysaur
// venusaur
// charmander
// charmeleon
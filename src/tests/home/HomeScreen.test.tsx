import {screen} from '@testing-library/react'
import renderApplication from '../RenderApplication'
import userEvent from "@testing-library/user-event";
import resolveAwaitingPromises from "../../PromiseProcessing";

describe('', () => {
    test('購入画面のページタイトルが表示されている', async () => {
        await renderApplication('/')


        expect(screen.getByText('Pokemon Vending Machine')).toBeInTheDocument()
    })

    test('「拡張パック 20th Anniversary 10枚入り」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥260"))
        expect(screen.getByAltText('拡張パック 20th Anniversary 10枚入り')).toBeInTheDocument()
    })

    test('「neo 金,銀,新世界へ•••」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥180"))
        expect(screen.getByAltText('neo 金,銀,新世界へ•••')).toBeInTheDocument()
    })

    test('「さいはての攻防 拡張パック」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥290"))
        expect(screen.getByAltText('さいはての攻防 拡張パック')).toBeInTheDocument()
    })

    test('「DP 時空の創造」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥310"))
        expect(screen.getByAltText('DP 時空の創造')).toBeInTheDocument()
    })

    test('「ブラックコレクション拡張パック」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥170"))
        expect(screen.getByAltText('ブラックコレクション拡張パック')).toBeInTheDocument()
    })

    test('「ソード&シールド Vmaxライジング 強化拡張パック」パックの画像と値段がある', async () => {
        await renderApplication('/')


        expect(screen.getByText("¥410"))
        expect(screen.getByAltText('ソード&シールド Vmaxライジング 強化拡張パック')).toBeInTheDocument()
    })

    test('購入ボタンを押したら、開封画面に遷移し、Buy New Packの文字が見える', async () => {
        await renderApplication('/')
        const buyButton = screen.getByText('¥260')


        userEvent.click(buyButton)
        await resolveAwaitingPromises()


        expect(screen.getByText('Buy New Pack')).toBeInTheDocument()
    })
})
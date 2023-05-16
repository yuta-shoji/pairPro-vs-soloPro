import React from 'react'
import {screen} from '@testing-library/react'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import AppPropsBuilder from '../AppPropsBuilder'

describe('アプリ全体', () => {
    let appProps: AppProps = (new AppPropsBuilder()).build()

    test('HeaderにポケモンのLogoが見える', async () => {
        await renderApplication('/', appProps)


        const logo = screen.getByAltText('pokemon-logo')
        expect(logo).toBeInTheDocument()
    })

    test('Headerにホーム画面に遷移するボタンがある', async () => {
        await renderApplication('/', appProps)


        const homeButton = screen.getByText('ホーム') as HTMLAnchorElement
        expect(homeButton).toBeInTheDocument()
        expect(homeButton.href).toEqual('http://localhost/')
    })

    test('Headerにマイカード画面に遷移するボタンがある', async () => {
        await renderApplication('/', appProps)


        const myCardButton = screen.getByText('マイカードリスト') as HTMLAnchorElement
        expect(myCardButton).toBeInTheDocument()
        expect(myCardButton.href).toEqual('http://localhost/my-card')
    })

    test('ルートパスがホーム画面になっている', async () => {
        await renderApplication('/', appProps)
        expect(screen.getByText('Pokemon Vending Machine')).toBeInTheDocument()
    })

    test('/my-cardがマイカード画面になっている', async () => {
        await renderApplication('/my-card', appProps)
        const countOfTitleAndHeaderButton = 2
        expect(screen.getAllByText('マイカードリスト').length).toEqual(countOfTitleAndHeaderButton)
    })
})

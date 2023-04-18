import React from 'react'
import {render, screen} from '@testing-library/react'
import App from '../App'

describe('アプリ全体', () => {
    test('HeaderにポケモンのLogoが見える', () => {
        render(<App/>)
        const logo = screen.getByAltText('pokemon-logo')
        expect(logo).toBeInTheDocument()
    })
})

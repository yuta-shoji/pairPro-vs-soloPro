import {act} from 'react-dom/test-utils'
import {render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import App, {AppProps} from '../App'

export default async function renderApplication(url: string, appProps: AppProps) {
    await act(async () => {
        window.history.pushState({}, '', url)
        render(
            <BrowserRouter>
                <App myCardManager={appProps.myCardManager}
                     pokemonRepo={appProps.pokemonRepo}
                     randomNumberProvider={appProps.randomNumberProvider}
                />
            </BrowserRouter>
        )
    })
}
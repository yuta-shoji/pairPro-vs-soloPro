import {act} from 'react-dom/test-utils'
import {render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import App from '../App'

export default async function renderApplication(url: string) {
    await act(async () => {
        window.history.pushState({}, '', url)
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    })
}
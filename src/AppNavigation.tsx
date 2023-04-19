import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {PUBLIC_URL} from './constants'


export default function AppNavigation() {
    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <App/>
        </BrowserRouter>
    )
}
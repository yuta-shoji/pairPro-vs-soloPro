import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {PUBLIC_URL} from './constants'
import {useEffect} from 'react'


export default function AppNavigation() {
    useEffect(() => {
        console.log(PUBLIC_URL)
    }, [])

    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <App/>
        </BrowserRouter>
    )
}
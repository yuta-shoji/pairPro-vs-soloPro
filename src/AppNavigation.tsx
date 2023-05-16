import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {PUBLIC_URL} from './constants'
import {useEffect} from 'react'
import AppPropsBuilder from './AppPropsBuilder'


export default function AppNavigation() {
    useEffect(() => {
        console.log(PUBLIC_URL)
    }, [])

    const appProps = (new AppPropsBuilder()).build()

    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <App myCardManager={appProps.myCardManager}/>
        </BrowserRouter>
    )
}
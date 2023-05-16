import React from 'react'
import styles from './App.module.scss'
import pokemonLogo from './images/pokemon-logo.png'
import {Link, Route, Routes} from 'react-router-dom'
import HomeScreen from './home/HomeScreen'
import MyCardScreen from './myCard/MyCardScreen'
import Contents from './Contents'
import UnpackScreen from "./Open/UnpackScreen";
import MyCardManager from './MyCardManager'

export interface AppProps {
    myCardManager: MyCardManager
}

export default function App(props: AppProps) {
    return (
        <>
            <header className={styles.header}>
                <Contents>
                    <div className={styles.headerContents}>
                        <img className={styles.logo} src={pokemonLogo} alt="pokemon-logo"/>
                        <div className={styles.headerButtonArea}>
                            <Link to="/" className={styles.headerButton}>ホーム</Link>
                            <Link to="/my-card" className={styles.headerButton}>マイカードリスト</Link>
                        </div>
                    </div>
                </Contents>
            </header>

            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/my-card" element={<MyCardScreen myCardManager={props.myCardManager}/>}/>
                <Route path="/open" element={<UnpackScreen/>}/>
                <Route path="/my-card" element={<MyCardScreen myCardManager={props.myCardManager}/>}/>
            </Routes>
        </>
    )
}

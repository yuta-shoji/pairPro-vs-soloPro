import React from 'react'
import styles from './App.module.scss'
import pokemonLogo from './images/pokemon-logo.png'
import {Route, Routes} from 'react-router-dom'
import HomeScreen from './home/HomeScreen'
import MyCardScreen from './myCard/MyCardScreen'
import Contents from './Contents'

export default function App() {
    return (
        <>
            <header className={styles.header}>
                <Contents>
                    <div className={styles.headerContents}>
                        <img className={styles.logo} src={pokemonLogo} alt="pokemon-logo"/>
                        <div className={styles.headerButtonArea}>
                            <a href="/" className={styles.headerButton}>ホーム</a>
                            <a href="/my-card" className={styles.headerButton}>マイカードリスト</a>
                        </div>
                    </div>
                </Contents>
            </header>

            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/my-card" element={<MyCardScreen/>}/>
            </Routes>
        </>
    )
}

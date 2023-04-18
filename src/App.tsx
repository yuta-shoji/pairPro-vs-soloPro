import React from 'react'
import styles from './App.module.scss'
import pokemonLogo from './images/pokemon-logo.png'
import classNames from 'classnames'
import {Route, Routes} from 'react-router-dom'
import HomeScreen from './home/HomeScreen'
import MyCardScreen from './myCard/MyCardScreen'

export default function App() {
    return (
        <>
            <header className={styles.header}>
                <div className={classNames(styles.contents, styles.headerContents)}>
                    <img className={styles.logo} src={pokemonLogo} alt="pokemon-logo"/>
                    <a href="/">ホーム</a>
                    <a href="/my-card">マイカードリスト</a>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/my-card" element={<MyCardScreen/>}/>
            </Routes>
        </>
    )
}

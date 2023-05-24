import React from 'react'
import styles from './App.module.scss'
import pokemonLogo from './pokemonVendingMachine/images/pokemon-logo.png'
import {Link, Route, Routes} from 'react-router-dom'
import Contents from './Contents'
import MyCardManager from './MyCardManager'
import RandomNumberProvider from "./RandomNumberProvider";
import {PokemonRepo} from "./pokemonVendingMachine/Repo/NetwoekPokemonRepo";
import HomeScreen from "./pokemonVendingMachine/home/HomeScreen";
import MyCardScreen from "./pokemonVendingMachine/myCardScreen/MyCardScreen";
import UnpackScreen from "./pokemonVendingMachine/UnpackScreen/UnpackScreen";

export interface AppProps {
    myCardManager: MyCardManager,
    pokemonRepo: PokemonRepo,
    randomNumberProvider: RandomNumberProvider
}

export default function App(props: AppProps) {
    const {myCardManager, pokemonRepo, randomNumberProvider} = props

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
                <Route path="/my-card"
                       element={<MyCardScreen myCardManager={myCardManager}/>}
                />
                <Route path="/open"
                       element={<UnpackScreen myCardManager={myCardManager}
                                              pokemonRepo={pokemonRepo}
                                              randomNumberProvider={randomNumberProvider}
                       />}
                />
            </Routes>
        </>
    )
}

import React from 'react';
import styles from './App.module.scss'
import pokemonLogo from './images/pokemon-logo.png'
import classNames from "classnames";

function App() {
    return (
        <>
            <header className={styles.header}>
                <div className={classNames(styles.contents, styles.headerContents)}>
                    <img className={styles.logo} src={pokemonLogo} alt="pokemon-logo"/>
                </div>
            </header>
        </>
    )
}

export default App

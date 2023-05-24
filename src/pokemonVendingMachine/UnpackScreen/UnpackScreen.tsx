import Card from "../models/Card";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./UnpackScreen.module.scss"
import {AppProps} from "../../App";
import RotateCardView from "../card/RotateCardView";
import Contents from "../../Contents";

export default function UnpackScreen(props: AppProps) {
    const {myCardManager, pokemonRepo, randomNumberProvider} = props
    const [cards, setCards] = useState<Card[]>([])

    useEffect(() => {
        (async () => {
            console.log('Render UnpackScreen===================')
            const cards = []
            for (let num of [...Array(5)]) {
                const random = randomNumberProvider.random()
                const pokemon = await pokemonRepo.getPokemon(random)
                const card = {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map(typeSlot => typeSlot.type.name),
                    imageUrl: pokemon.sprites.other["official-artwork"].front_default
                }
                cards.push(card)
                myCardManager.set(card)
            }
            setCards(cards)
        })()
    }, [])

    return (
        <Contents>
            <div className={styles.cardContainer}>
                {cards.map((card, index) => <RotateCardView key={index} card={card}/>)}
            </div>

            <Link className={styles.link} to="/">
                <div className={styles.buyNewPack}>
                    <span>Buy New Pack</span>
                </div>
            </Link>
        </Contents>
    )
}
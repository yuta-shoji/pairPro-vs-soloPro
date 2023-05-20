import CardView from "./CardView";
import Card from "../models/Card";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppProps} from "../App";

export default function UnpackScreen(props: AppProps) {
    const {pokemonRepo, randomNumberProvider} = props
    const [cards, setCards] = useState<Card[]>([])

    useEffect(() => {
        (async () => {
            const cards = []
            for (let num of [...Array(5)]) {
                const pokemon = await pokemonRepo.getPokemon(randomNumberProvider.random())
                cards.push({
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(typeSlot => typeSlot.type.name)
                })
            }
            setCards(cards)
        })()
    }, [])

    return (
        <>
            {cards.map((card, index) => <CardView key={index} card={card}/>)}

            <Link to="/">Buy New Pack</Link>
        </>
    )
}
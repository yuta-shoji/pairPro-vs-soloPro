import Card from "../models/Card";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./UnpackScreen.module.scss"
import {AppProps} from "../../App";
import RotateCardView from "../card/RotateCardView";
import Contents from "../../Contents";
import {FlavorTextEntry, Genus} from "../models/Species";

export default function UnpackScreen(props: AppProps) {
    const {myCardManager, pokemonRepo, randomNumberProvider} = props
    const [cards, setCards] = useState<Card[]>([])

    useEffect(() => {
        (async () => {
            const cards = []
            for (let num of [...Array(5)]) {
                const random = randomNumberProvider.random()
                const pokemon = await pokemonRepo.getPokemon(random)
                const species = await pokemonRepo.getSpecies(random)
                const card = {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map(typeSlot => typeSlot.type.name),
                    imageUrl: pokemon.sprites.other["official-artwork"].front_default,
                    weight: pokemon.weight,
                    height: pokemon.height,
                    genus: findByEnglish(species.genera),
                    flavor_text: firstOrBlank(species.flavor_text_entries),
                }
                cards.push(card)
                myCardManager.set(card)
            }
            setCards(cards)
        })()
    }, [])

    const findByEnglish = (genera: Genus[]): string => {
        const englishGenus = genera.find(genus => genus.language.name === "en") as Genus
        if (englishGenus !== undefined) {
            return englishGenus.genus
        }
        return ""
    }

    const firstOrBlank = (flavorTextEntries: FlavorTextEntry[]): string => {
        if (flavorTextEntries.length === 0) {
            return ''
        }
        return flavorTextEntries[0].flavor_text
    }

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
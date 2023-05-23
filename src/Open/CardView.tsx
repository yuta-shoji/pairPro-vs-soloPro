import {useState} from "react";
import Card from "../models/Card";
import styles from "./CardView.module.scss"
import CardBackImage from "../images/back_of_card_image.jpeg"
import classNames from "classnames";

export default function CardView(props: { card: Card }) {
    const {card} = props
    const [cardFrontContainerStyle, setCardFrontContainerStyle] = useState(styles.cardFrontContainer)
    const [cardBackContainerStyle, setCardBackContainerStyle] = useState(styles.cardBackContainer)

    const onClickCard = () => {
        setCardFrontContainerStyle(classNames(styles.cardFrontContainer, styles.turnOverCardFront))
        setCardBackContainerStyle(classNames(styles.cardBackContainer, styles.turnOverCardBack))
    }


    return (
        <div className={styles.card}>
            <div className={cardFrontContainerStyle} title="cardFront">
                <>
                    <div className={styles.cardId}>#{card.id}</div>
                    <img className={styles.pokemonImage} src={card.imageUrl} alt="pokemonImage"/>
                    <div className={classNames(styles.cardInfo, styles.cardName)}>{card.name}</div>
                    <div className={classNames(styles.cardInfo, styles.cardType)}>{card.type.join(',')}</div>
                </>
            </div>

            <div className={cardBackContainerStyle} onClick={onClickCard} title='cardBack'>
                <img className={styles.cardBackImage} src={CardBackImage} alt="ポケモンカード裏面"/>
            </div>
        </div>
    )
}
import {useState} from "react";
import Card from "../models/Card";
import styles from "./RotateCardView.module.scss"
import CardBackImage from "../images/back_of_card_image.jpeg"
import classNames from "classnames";
import CardView from "./CardView";
import {useNavigate} from "react-router-dom";

export default function RotateCardView(props: { card: Card }) {
    const {card} = props
    const [cardFrontContainerStyle, setCardFrontContainerStyle] = useState(styles.cardFrontContainer)
    const [cardBackContainerStyle, setCardBackContainerStyle] = useState(styles.cardBackContainer)
    const navigate = useNavigate()

    const onClickCard = () => {
        setCardFrontContainerStyle(classNames(styles.cardFrontContainer, styles.turnOverCardFront))
        setCardBackContainerStyle(classNames(styles.cardBackContainer, styles.turnOverCardBack))
    }

    const navigateDetail = () => {
        navigate(`card-detail/${card.id}`)
    }

    return (
        <div className={styles.card}>
            <div className={cardFrontContainerStyle} title="cardFront" onClick={navigateDetail}>
                <CardView card={card}/>
            </div>

            <div className={cardBackContainerStyle} onClick={onClickCard} title='cardBack'>
                <img className={styles.cardBackImage} src={CardBackImage} alt="ポケモンカード裏面"/>
            </div>
        </div>
    )
}
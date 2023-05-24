import Card from "../models/Card";
import styles from "./CardView.module.scss";
import classNames from "classnames";

export default function CardView(props: {card: Card}) {
    return (
        <>
            <div className={styles.cardId}>#{props.card.id}</div>
            <img className={styles.pokemonImage} src={props.card.imageUrl} alt="pokemonImage"/>
            <div className={classNames(styles.cardInfo, styles.cardName)}>{props.card.name}</div>
            <div className={classNames(styles.cardInfo, styles.cardType)}>{props.card.types.join(',')}</div>
        </>
    )
}
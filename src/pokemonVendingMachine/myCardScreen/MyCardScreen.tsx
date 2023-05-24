import styles from './MyCardScreen.module.scss'
import MyCardManager from "../../MyCardManager";
import Contents from "../../Contents";
import CardView from "../card/CardView";

export default function MyCardScreen(
    props: { myCardManager: MyCardManager }
) {
    return (
        <Contents>
            <h1 className={styles.myCardListTitle}>マイカードリスト</h1>

            <div className={styles.cardLengthTitle}>全{props.myCardManager.getAll().length}枚</div>

            <div className={styles.cardContainer}>
                {props.myCardManager.getAll().map((card, index) => (
                    <div className={styles.card} key={index}>
                        <CardView card={card}/>
                    </div>
                ))}
            </div>
        </Contents>
    )
}
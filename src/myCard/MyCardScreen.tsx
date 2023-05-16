import styles from './MyCardScreen.module.scss'
import Contents from '../Contents'
import {AppProps} from '../App'

export default function MyCardScreen(props: AppProps) {
    return (
        <Contents>
            <h1 className={styles.title}>マイカードリスト</h1>

            {props.myCardManager.getAll().map(card => (
                <div key={card.id}>{card.id}</div>
            ))}
        </Contents>
    )
}
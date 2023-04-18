import styles from './HomeScreen.module.scss'
import Contents from '../Contents'

export default function HomeScreen() {
    return (
        <Contents>
            <h1 className={styles.title}>Pokemon Vending Machine</h1>
        </Contents>
    )
}
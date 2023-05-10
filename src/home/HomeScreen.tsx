import styles from './HomeScreen.module.scss'
import Contents from '../Contents'
import pack1 from '../images/pack_ver1.png'
import pack2 from '../images/pack_ver2.jpg'
import pack3 from '../images/pack_ver3.jpeg'
import pack4 from '../images/pack_ver4.jpg'
import pack5 from '../images/pack_ver5.jpeg'
import pack6 from '../images/pack_ver6.png'

export default function HomeScreen() {
    return (
        <Contents>
            <h1 className={styles.title}>Pokemon Vending Machine</h1>
            <div className={styles.packContainer}>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack1} alt="拡張パック 20th Anniversary 10枚入り"/>
                    <div className={styles.price}>
                        <span>¥260</span>
                    </div>
                </div>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack2} alt="neo 金,銀,新世界へ•••"/>
                    <div className={styles.price}>
                        <span>¥180</span>
                    </div>
                </div>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack3} alt="さいはての攻防 拡張パック"/>
                    <div className={styles.price}>
                        <span>¥290</span>
                    </div>
                </div>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack4} alt="DP 時空の創造"/>
                    <div className={styles.price}>
                        <span>¥310</span>
                    </div>
                </div>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack5} alt="ブラックコレクション拡張パック"/>
                    <div className={styles.price}>
                        <span>¥170</span>
                    </div>
                </div>
                <div className={styles.pack}>
                    <img className={styles.image} src={pack6} alt="ソード&シールド Vmaxライジング 強化拡張パック"/>
                    <div className={styles.price}>
                        <span>¥410</span>
                    </div>
                </div>
            </div>
        </Contents>
    )
}
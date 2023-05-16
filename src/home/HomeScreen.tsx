import styles from './HomeScreen.module.scss'
import Contents from '../Contents'
import pack1 from '../images/pack_ver1.png'
import pack2 from '../images/pack_ver2.jpg'
import pack3 from '../images/pack_ver3.jpeg'
import pack4 from '../images/pack_ver4.jpg'
import pack5 from '../images/pack_ver5.jpeg'
import pack6 from '../images/pack_ver6.png'
import Pack from '../models/Pack'
import PackScreen from "./PackScreen";

export default function HomeScreen() {
    const packs: Pack[] = [
        {title: "拡張パック 20th Anniversary 10枚入り", price: "¥260", image: pack1},
        {title: "neo 金,銀,新世界へ•••", price: "¥180", image: pack2},
        {title: "さいはての攻防 拡張パック", price: "¥290", image: pack3},
        {title: "DP 時空の創造", price: "¥310", image: pack4},
        {title: "ブラックコレクション拡張パック", price: "¥170", image: pack5},
        {title: "ソード&シールド Vmaxライジング 強化拡張パック", price: "¥410", image: pack6},
    ]

    return (
        <Contents>
            <h1 className={styles.title}>Pokemon Vending Machine</h1>
            <div className={styles.packContainer}>
                {packs.map(pack =>
                    <PackScreen pack={pack} />
                )}
            </div>
        </Contents>
    )
}
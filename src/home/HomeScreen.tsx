import styles from './HomeScreen.module.scss'
import Contents from '../Contents'
import pack1 from "../images/pack_ver1.png"
import pack2 from "../images/pack_ver2.jpg"
import pack3 from "../images/pack_ver3.jpeg"
import pack4 from "../images/pack_ver4.jpg"
import pack5 from "../images/pack_ver5.jpeg"
import pack6 from "../images/pack_ver6.png"

export default function HomeScreen() {
    return (
        <Contents>
            <h1 className={styles.title}>Pokemon Vending Machine</h1>
            <img src={pack1} alt="拡張パック 20th Anniversary 10枚入り"/>
            <div>￥260</div>
            <img src={pack2} alt="neo 金,銀,新世界へ•••"/>
            <div>￥180</div>
            <img src={pack3} alt="さいはての攻防 拡張パック"/>
            <div>￥290</div>
            <img src={pack4} alt="DP 時空の創造"/>
            <div>￥310</div>
            <img src={pack5} alt="ブラックコレクション拡張パック"/>
            <div>￥170</div>
            <img src={pack6} alt="ソード&シールド Vmaxライジング 強化拡張パック"/>
            <div>￥410</div>
        </Contents>
    )
}
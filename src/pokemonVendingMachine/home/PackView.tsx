import styles from "./HomeScreen.module.scss";
import Pack from "../models/Pack"
import { Link } from "react-router-dom";

export default function PackView(props: {
    pack: Pack
}) {
    return (
        <div key={props.pack.title}>
            <img className={styles.image} src={props.pack.image} alt={props.pack.title}/>
            <Link className={styles.link} to='/open'>
                <div className={styles.price}>
                    <span>{props.pack.price}</span>
                </div>
            </Link>
        </div>
    )
}
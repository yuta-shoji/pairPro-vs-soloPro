import {useState} from "react";
import Card from "../models/Card";

export default function CardView(props: { card: Card }) {
    const [onClick, setOnClick] = useState(false)

    return (
        <div onClick={() => setOnClick(true)}>
            { onClick ? props.card.name : "?" }
        </div>
    )
}
import {useState} from "react";
import Card from "../models/Card";

export default function CardView(props: { card: Card }) {
    const { card } = props
    const [onClick, setOnClick] = useState(false)

    return (
        <>
            <div onClick={() => setOnClick(true)}>
                {!onClick && "?"}
            </div>
            {onClick &&
                <>
                   <div>{card.id}</div>
                   <div>{card.name}</div>
                   <div>{card.type.join(',')}</div>
                </>
            }
        </>
    )
}
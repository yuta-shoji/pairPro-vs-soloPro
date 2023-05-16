import CardView from "./CardView";
import Card from "../models/Card";
import {Link} from "react-router-dom";

export default function UnpackScreen() {
    const cards: Card[] = [
        {name: "bulbasaur", id: 1},
        {name: "ivysaur", id: 2},
        {name: "venusaur", id: 3},
        {name: "charmander", id: 4},
        {name: "charmeleon", id: 5},
    ]

    return (
        <>
            { cards.map(card => <CardView card={card}/>) }

            <Link to="/">Buy New Pack</Link>
        </>
    )
}
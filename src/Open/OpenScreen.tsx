import CardScreen from "./CardScreen";
import Card from "../models/Card";
import {Link} from "react-router-dom";

export default function OpenScreen() {
    const cards: Card[] = [
        {name: "bulbasaur"},
        {name: "ivysaur"},
        {name: "venusaur"},
        {name: "charmander"},
        {name: "charmeleon"},
    ]

    return (
        <>
            { cards.map(card => <CardScreen card={card}/>) }

            <Link to="/">Buy New Pack</Link>
        </>
    )
}
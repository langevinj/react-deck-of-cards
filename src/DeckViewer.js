import React, {useState, useEffect} from 'react'
import Deck from './Deck'
import axios from "axios"

const DeckViewer = () => {
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            console.log(res.data)
           setDeck(res.data.deck_id);
        }
        loadDeck();
    }, [])

    return (
        <div>
            <h1>{deck ? "You deck is ready" : "Shuffling..."}</h1>
            <Deck deck_id={deck}/>
        </div>
    )
}
export default DeckViewer;
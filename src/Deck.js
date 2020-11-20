import React, { useState, useEffect } from 'react'
import './Deck.css'
import axios from "axios";
import Card from './Card'

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const[autoDraw, setautoDraw] = useState(false)
    const[drawn, setDrawn] = useState([])

    //get the deck when the page loads
    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            console.log(res.data)
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, [])

    useEffect(() => {
            async function drawNewCard() {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
                const card = res.data.cards[0];
                setDrawn(drawn => [...drawn, {id: card.code, image: card.image, suit: card.suit + " " + card.value}])
            }
            drawNewCard(); 
        }, [autoDraw])

    const cards = drawn.map(d => (<Card id={d.id} image={d.image} />))

    function toggleAutoDraw(){
        autoDraw ? setautoDraw(false) : setautoDraw(true)
    }

    return (
        <div>
            <h1>{deck ? "You deck is ready" : "Shuffling..."}</h1>
            <div>
                {drawn.length !== 52 ? <button className="Deck-drawbutton" onClick={toggleAutoDraw}>Draw a card!</button> : <h2>Out of cards!</h2>}
            </div>
            <div className="Card-container">
                {cards}
            </div>
        </div> 
    )
}

export default Deck;
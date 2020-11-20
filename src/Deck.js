import React, { useState, useEffect } from 'react'
import './Deck.css'
import axios from "axios";
import Card from './Card'

const Deck = ({deck_id}) => {
    const[remainingCards, setRemainingCards] = useState(52)
    const[card, setCard] = useState(null)
    const[cardsRemain, setCardsRemain] = useState(true)
    const[drawn, setDrawn] = useState([])

    const drawCard = () => {
        if(remainingCards >= 1){
            setRemainingCards(c => c - 1)
            console.log(`Remaining cards: ${remainingCards}`)
        } else {
            setCardsRemain(false)
        }
    }

    useEffect(() => {
            async function drawNewCard() {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                const card = res.data.cards[0];
                setCard(card.image)
                setDrawn(drawn => [...drawn, {id: card.code, image: card.image, suit: card.suit + " " + card.value}])
            }
            drawNewCard(); 
        }, [remainingCards])

    const cards = drawn.map(d => (<Card id={d.id} image={d.image} />))

    return (
        <div className="Container">
            <div>
                {cardsRemain ? <button className="Deck-drawbutton" onClick={drawCard}>Draw a card!</button> : <h2>Out of cards!</h2>}
            </div>
            <div className="Card-container">
                {cards}
            </div>
        </div> 
    )
}

export default Deck;
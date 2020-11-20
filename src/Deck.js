import React, { useState, useEffect } from 'react'
import './Deck.css'
import axios from "axios";

const Deck = ({deck_id}) => {
    const[remainingCards, setRemainingCards] = useState(52)
    const[card, setCard] = useState(null)
    const[cardsRemain, setCardsRemain] = useState(true)

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
                setCard(res.data.cards[0].image)
            }
            drawNewCard(); 
    }, [remainingCards])


    return (
        <div>
            <div>
                {cardsRemain ? <button className="Deck-drawbutton" onClick={drawCard}>Draw a card!</button> : <h2>Out of cards!</h2>}
            </div>
            <img className="Card-image" src={card ? card : ""}></img>
            <div>
                {}
            </div>
        </div> 
    )
}

export default Deck;
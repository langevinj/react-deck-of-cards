import React, { useState, useEffect, useRef } from 'react'
import './Deck.css'
import axios from "axios";
import Card from './Card'

const BASE_URL = "https://deckofcardsapi.com/api/deck"

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const[autoDraw, setautoDraw] = useState(false)
    const[drawn, setDrawn] = useState([])
    const timerRef = useRef(null);

    //get the deck when the page loads
    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, [])

    //getting a new card
    useEffect(() => {
            async function drawNewCard() {
                try{
                    //"draw" a card from the API
                    const res = await axios.get(`${BASE_URL}/${deck}/draw/?count=1`)
                    if(res.data.remaining === 0){
                        setautoDraw(false)
                        throw new Error("NO CARDS REMAINING!")
                    }
                    const card = res.data.cards[0];
                    //add card to the "drawn" list
                    setDrawn(drawn => [...drawn, { id: card.code, image: card.image, suit: card.suit + " " + card.value }])
                } catch (err) {
                    toggleAutoDraw()
                    alert(err)
                }
            }

            if(autoDraw && !timerRef.current){
                timerRef.current = setInterval(async () => {
                    await drawNewCard();
                }, 1000)
            }

            return () => {
                clearInterval(timerRef.current)
                timerRef.current = null;
            };
    }, [autoDraw, setautoDraw, deck])

    const cards = drawn.map(d => (<Card id={d.id} image={d.image} />))

    function toggleAutoDraw(){
        autoDraw ? setautoDraw(false) : setautoDraw(true);
    }

    //shuffle the current deck and remove cards already placed by reseting drawn
    const shuffleDeck = async () => {
        await axios.get(`${BASE_URL}/${deck}/shuffle/`);
        setDrawn([])
        setautoDraw(false)
    }

    return (
        <div>
            <h1>{deck ? "You deck is ready" : "Shuffling..."}</h1>
            <div>
                {autoDraw ? <button className="Deck-stopdrawbutton" onClick={toggleAutoDraw}>Stop Drawing</button> : <button className="Deck-drawbutton" onClick={toggleAutoDraw}>Start drawing!</button>}
                <button className="Deck-shuffle" onClick={shuffleDeck}>Shuffle Up!</button>
            </div>
            <div className="Card-container">
                {cards}
            </div>
        </div> 
    )
}

export default Deck;
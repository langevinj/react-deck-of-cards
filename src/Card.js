import React, { useState } from 'react'
import './Card.css'

const Card = ({id, image}) => {
    const [{tilt, ypos}] = useState ({
        tilt: Math.random() * 90 - 45,
        ypos: Math.random() * 40 -20
    })

    return (
        <div className="Card-image" key={id}>
            <img key={id} id={id} src={image} style={{transform: `rotate(${tilt}deg) translateY(${ypos}px)`}}></img>
        </div>
    )
}

export default Card;
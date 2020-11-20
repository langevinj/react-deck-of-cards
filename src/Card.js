import React, { useState } from 'react'
import './Card.css'

const Card = ({id, image}) => {
    const [{tilt}] = useState ({
        tilt: Math.random() * 90 - 45
    })

    return (
        <div className="Card-image">
            <img key={id} id={id} src={image} style={{ transform: `rotate(${tilt}deg)` }}></img>
        </div>
        
    )
}

export default Card;
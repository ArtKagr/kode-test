import React from 'react'

import '../../styles/CardObject.scss'

export function CardObject(props) {
        return (
            <div key={props.item} className="card">
                <img className="card-image" src={props.card.imageUrl} alt={props.card.name}/>
                <div className="card-description">
                    <p className="card-description-title">{props.card.name}</p>
                    <p className="card-description-subtitle">{props.card.artist}</p>
                </div>
            </div>
        )
}
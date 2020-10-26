import React from 'react'
import { Link } from "react-router-dom"

import '../../styles/CardObject.scss'

export class CardObject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { id, imageUrl, name, artist } = this.props.card;
        return (
            <div>
                <Link to={`/cards/${id}`} className="card" id={`card-${id}`}>
                    <img className="card-image" src={imageUrl} alt={name}/>
                    <div className="card-description">
                        <p className="card-description-title">{name}</p>
                        <p className="card-description-subtitle">{artist}</p>
                    </div>
                </Link>
            </div>
        )
    }
}
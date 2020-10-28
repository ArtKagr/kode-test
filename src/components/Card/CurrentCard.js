import React from 'react'
import axios from "axios"
import '../../styles/CurrentCard.scss'

export class CurrentCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentCard: null }
    }

    componentDidMount() {
        const link = window.location.href.split('/')
        axios.get(`https://api.pokemontcg.io/v1/cards`, { params: { id: link[link.length - 1] } })
            .then(res => {
                this.setState( { currentCard: res.data.cards })
            })
            .catch(e => { console.warn(e) })
    }

    render() {
        let page = null
        if(this.state.currentCard && this.state.currentCard.length) page = this.state.currentCard.map(card =>
            <div className="current_card">
                <div className="current_card-content">
                    <img className="current_card-content-image" src={card.imageUrl} alt={card.name}/>
                    <div className="current_card-content-specifications">
                        <div className="current_card-content-specifications-main">
                            <div className="current_card-content-specifications-main-text">
                                <span className="current_card-content-specifications-main-text-title">Name:</span>
                                <span className="current_card-content-specifications-main-text-value">{card.name}</span>
                            </div>
                            <div className="current_card-content-specifications-main-text">
                                <span className="current_card-content-specifications-main-text-title">Type:</span>
                                <span className="current_card-content-specifications-main-text-value">{card && card.types && card.types.length ? card.types[0] : null}</span>
                            </div>
                            <div className="current_card-content-specifications-main-text">
                                <span className="current_card-content-specifications-main-text-title">SubType:</span>
                                <span className="current_card-content-specifications-main-text-value">{card.subtype}</span>
                            </div>
                        </div>
                        <div className="current_card-content-specifications-parameters">
                            <div className="current_card-content-specifications-parameters-text">
                                <span className="current_card-content-specifications-parameters-text-title">attackDamage:</span>
                                <span className="current_card-content-specifications-parameters-text-value">{card.attacks && card.attacks.length ? card.attacks[0].damage : null}</span>
                            </div>
                            <div className="current_card-content-specifications-parameters-text">
                                <span className="current_card-content-specifications-parameters-text-title">attackCost:</span>
                                <span className="current_card-content-specifications-parameters-text-value">
                                    {card.attacks && card.attacks.length ? <div className="current_card-content-specifications-parameters-text-value-cost">
                                        {card.attacks[0].cost.map(cost => <p className="current_card-content-specifications-parameters-text-value-cost-value">{cost}</p>)}
                                    </div> : null}
                                </span>
                            </div>
                            <div className="current_card-content-specifications-parameters-text">
                                <span className="current_card-content-specifications-parameters-text-title">resistances:</span>
                                <span className="current_card-content-specifications-parameters-text-value">{null}</span>
                            </div>
                            <div className="current_card-content-specifications-parameters-text">
                                <span className="current_card-content-specifications-parameters-text-title">evolvesFrom:</span>
                                <span className="current_card-content-specifications-parameters-text-value">{null}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="current_card-content-description">{card && card.text ? card.text.map(text => <span className="current_card-content-description-text">{text}</span>) : null}</div>
            </div>)
        return (
            <div>{page}</div>
        )
    }
}
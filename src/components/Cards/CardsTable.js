import React from 'react';
import '../../styles/CardTable.scss'
import {CardObject} from "../Card/CardObject";
import axios from "axios";
import {Pagination} from "../Pagination";

export class CardTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
        this.setPreviousCards = this.setPreviousCards.bind(this)
        this.setNextCards = this.setNextCards.bind(this)
    }

    setPreviousCards(previousCards) {
        this.setState({ cards: previousCards })
    }

    setNextCards(nextCards) {
        this.setState({ cards: nextCards })
    }

    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v1/cards?page=1')
            .then(res => {
                const cards = res.data.cards
                this.setState({ cards })
            })
    }

    render() {
        let CardObjects = null
        if(this.state.cards.length) CardObjects = this.state.cards.map((currentCard, key) => <CardObject item={key} card={currentCard}/>)
        return (
            <div className="card_table">
                <div className="card_table-content">{CardObjects}</div>
                <Pagination setPreviousCards={this.setPreviousCards} setNextCards={this.setNextCards} />
            </div>
        );
    }
}
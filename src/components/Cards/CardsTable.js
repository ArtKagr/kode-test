import React from 'react'
import {CardObject} from "../Card/CardObject"
import {Pagination} from "../Pagination"
import {Navigation} from "./Navigation"
import '../../styles/CardTable.scss'
import axios from "axios";

export class CardTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            totalCount: 0,
            pageSize: 0,
            types: null,
            subTypes: null,
            currentPage: 1
        }
        this.setCards = this.setCards.bind(this)
        this.setTypes = this.setTypes.bind(this)
        this.setSubTypes = this.setSubTypes.bind(this)
        this.setCurrentPage = this.setCurrentPage.bind(this)
    }

    setCards(previousCards) {
        this.setState({ cards: previousCards })
    }

    setCurrentPage(currentPage) {
        this.setState({ currentPage })
    }

    setTypes(types) {
        this.setState({ types })
        axios.get('https://api.pokemontcg.io/v1/cards', {
            params: { page: 1, types: types === 'Types' ? null : types },
        })
            .then(res => {
                const cards = res.data.cards
                this.setState({
                    cards,
                    totalCount: res.headers['total-count'],
                    pageSize: res.headers['page-size']
                })
            })
    }

    setSubTypes(subTypes) {
        this.setState({ subTypes })
        axios.get('https://api.pokemontcg.io/v1/cards', {
            params: { page: 1, subtype: subTypes === 'Subtypes' ? null : subTypes }
        })
            .then(res => {
                const cards = res.data.cards
                this.setState({
                    cards,
                    totalCount: res.headers['total-count'],
                    pageSize: res.headers['page-size']
                })
            })
    }

    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v1/cards', { params: { page: 1 }})
            .then(res => {
                const cards = res.data.cards
                this.setState({
                    cards,
                    totalCount: res.headers['total-count'],
                    pageSize: res.headers['page-size']
                })
            })
    }

    render() {
        let CardObjects = null
        if(this.state.cards.length) CardObjects = this.state.cards.map(function(card, key) {
            return <CardObject card={card} />
        })
        return (
                <div className="card_table">
                    <Navigation
                        types={this.setTypes}
                        subTypes={this.setSubTypes}
                        currentPage={this.state.currentPage}
                    />
                    <div className="card_table-content">
                        <div className="card_table-content-cards">{CardObjects}</div>
                        <Pagination
                            setCards={this.setCards}
                            currentPage={this.setCurrentPage}
                            totalCount={this.state.totalCount}
                            pageSize={this.state.pageSize}
                            type={this.state.types === 'Types' ? null : this.state.types}
                            subtype={this.state.subTypes === 'Subtypes' ? null : this.state.subTypes}
                        />
                    </div>
                </div>
        );
    }
}
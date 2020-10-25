import React from 'react'
import '../../styles/CurrentCard.scss'
import axios from "axios";

export class CurrentCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentCard: null }
    }

    componentDidMount() {
        axios.get(`https://api.pokemontcg.io/v1/cards`, { params: { id: this.props.match.path.split('/')[2] } })
            .then(res => {
                this.setState( { currentCard: res.data.cards })
            })
            .catch(e => { console.warn(e) })
    }

    render() {
        return (
            <div className="current_card">
                Test
            </div>
        )
    }
}
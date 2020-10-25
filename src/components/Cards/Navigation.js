import React from 'react';
import '../../styles/Navigation.scss'
import axios from "axios";

export class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cardTypes: [], cardSubTypes: [], cards: [], totalCount: 0, pageSize: 0, currentType: 'Types', currentSubType: 'Subtypes' }
        this.setTypeCards = this.setTypeCards.bind(this)
        this.setSubTypeCards = this.setSubTypeCards.bind(this)
    }

    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v1/types')
            .then(res => { this.setState({ cardTypes: res.data.types }) })
            .catch(e => { console.warn(e) })
        axios.get('https://api.pokemontcg.io/v1/subtypes')
            .then(res => { this.setState({ cardSubTypes: res.data.subtypes }) })
            .catch(e => { console.warn(e) })
    }

    setTypeCards(event) {
        this.setState({ currentType: event.target.value})
        this.props.types(event.target.value)
    }

    setSubTypeCards(event) {
        this.setState({ currentSubType: event.target.value})
        this.props.subTypes(event.target.value)
    }

    render() {
        let typesArray = this.state.cardTypes.reduce(function(preVal, type, index) {
            if(index === 0) {
                preVal.push('Types')
                preVal.push(type)
            } else preVal.push(type)
            return preVal
        }, [])
        let subTypesArray = this.state.cardSubTypes.reduce(function(preVal, type, index) {
            if(index === 0) {
                preVal.push('Subtypes')
                preVal.push(type)
            } else preVal.push(type)
            return preVal
        }, [])
        const types = typesArray.map(function(type, index) {
            return <option key={index} value={type}>{type}</option>
        })
        const subtypes = subTypesArray.map(function(subType, index) {
            return <option key={index} value={subType}>{subType}</option>
        })
        return (
            <div className="navigation">
                <select className="navigation-type_search" onChange={this.setTypeCards} disabled={this.state.currentSubType !== 'Subtypes' || this.props.currentPage !== 1}>{types}</select>
                <select className="navigation-subtype_search" onChange={this.setSubTypeCards} disabled={this.state.currentType !== 'Types' || this.props.currentPage !== 1}>{subtypes}</select>
            </div>
        );
    }
}
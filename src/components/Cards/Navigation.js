import React from 'react';
import '../../styles/Navigation.scss'
import axios from "axios";

export class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cardTypes: [],
            cardTypesCopy: [],
            cardSubTypes: [],
            cardSubTypesCopy: [],
            cards: [],
            totalCount: 0,
            pageSize: 0,
            currentType: 'Types',
            currentSubType: 'Subtypes',
            subTypeListVisible: false,
            typeListVisible: false,
        }
        this.setTypeCards = this.setTypeCards.bind(this)
        this.setSubTypeCards = this.setSubTypeCards.bind(this)
        this.toggleSubTypeList = this.toggleSubTypeList.bind(this)
        this.toggleTypeList = this.toggleTypeList.bind(this)
        this.setSubTypeInput = this.setSubTypeInput.bind(this)
        this.setTypeInput = this.setTypeInput.bind(this)
        this.filterSubTypes = this.filterSubTypes.bind(this)
        this.filterTypes = this.filterTypes.bind(this)
        this.choiceSubtype = this.choiceSubtype.bind(this)
        this.choiceType = this.choiceType.bind(this)
    }

    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v1/types')
            .then(res => { this.setState({ cardTypes: res.data.types, cardTypesCopy: res.data.types }) })
            .catch(e => { console.warn(e) })
        axios.get('https://api.pokemontcg.io/v1/subtypes')
            .then(res => { this.setState({ cardSubTypes: res.data.subtypes, cardSubTypesCopy: res.data.subtypes }) })
            .catch(e => { console.warn(e) })
    }

    toggleSubTypeList() {
        this.setState((state) => ({
            subTypeListVisible: this.state.currentType !== 'Types' || this.props.currentPage !== 1 ? state.subTypeListVisible : !state.subTypeListVisible,
            cardSubTypes: state.cardSubTypesCopy
        }))
    }

    toggleTypeList() {
        this.setState((state) => ({
            typeListVisible: this.state.currentSubType !== 'Subtypes' || this.props.currentPage !== 1 ? state.typeListVisible : !state.typeListVisible,
            cardTypes: state.cardTypesCopy
        }))
    }

    setTypeCards(event) {
        this.setState({ currentType: event.target.value})
        this.props.types(event.target.value)
    }

    setSubTypeCards(event) {
        this.setState({ currentSubType: event.target.value})
        this.props.subTypes(event.target.value)
    }

    setSubTypeInput(event) {
        event.stopPropagation()
    }

    setTypeInput(event) {
        event.stopPropagation()
    }

    filterSubTypes(event) {
        const cardSubTypes = JSON.parse(JSON.stringify(this.state.cardSubTypesCopy))
        this.setState({ cardSubTypes: cardSubTypes.filter(type => type.toUpperCase().match('^' + event.target.value.toUpperCase())) })
    }

    filterTypes(event) {
        const cardTypes = JSON.parse(JSON.stringify(this.state.cardTypesCopy))
        this.setState({ cardTypes: cardTypes.filter(type => type.toUpperCase().match('^' + event.target.value.toUpperCase())) })
    }

    choiceSubtype(event) {
        this.setState((state) => ({ currentSubType: event.target.textContent }))
        this.props.subTypes(event.target.textContent)
    }

    choiceType(event) {
        this.setState((state) => ({ currentType: event.target.textContent }))
        this.props.types(event.target.textContent)
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
        const typeFilterField = this.state.typeListVisible ? <input className="navigation-search-list-input" placeholder="Enter value" onClick={this.setTypeInput} onChange={this.filterTypes}/> : null
        const subTypeFilterField = this.state.subTypeListVisible ? <input className="navigation-search-list-input" placeholder="Enter value" onClick={this.setSubTypeInput} onChange={this.filterSubTypes}/> : null
        const typesList = this.state.typeListVisible ? typesArray.map((subType) => <div className="navigation-search-list-subtypes-item" onClick={this.choiceType}>{subType}</div>) : null
        const subtypesList = this.state.subTypeListVisible ? subTypesArray.map((subType) => <div className="navigation-search-list-subtypes-item" onClick={this.choiceSubtype}>{subType}</div>) : null
        const typesCopy = [subTypeFilterField, <div className="navigation-search-list-subtypes">{subtypesList}</div>]
        const subtypesCopy = [typeFilterField, <div className="navigation-search-list-subtypes">{typesList}</div>]
        const typeFilter = <div className="navigation-search" onClick={this.toggleTypeList}>
                                <span className="navigation-search-value">{this.state.currentType}</span>
                                <div className="navigation-search-list">{subtypesCopy}</div>
                            </div>
        const subTypeFilter = this.state.typeListVisible
            ? null
            : <div className="navigation-search" onClick={this.toggleSubTypeList}>
                 <span className="navigation-search-value">{this.state.currentSubType}</span>
                 <div className="navigation-search-list">{typesCopy}</div>
              </div>
        return (
            <div className="navigation">{typeFilter}{subTypeFilter}</div>
        );
    }
}
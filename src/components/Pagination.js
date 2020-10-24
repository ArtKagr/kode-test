import React from 'react';
import '../styles/Pagination.scss'
import axios from "axios";

export class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.getPreviousPage = this.getPreviousPage.bind(this)
        this.getNextPage = this.getNextPage.bind(this)
        this.state = { currentPage: 1, }
    }

    getPreviousPage() {
        if(this.state.currentPage > 1) {
            this.setState((state) => ({ currentPage: state.currentPage - 1 }))
            axios.get(`https://api.pokemontcg.io/v1/cards?page=${this.state.currentPage - 1}`)
                .then(res => { this.props.setPreviousCards(res.data.cards) })
                .catch(e => { console.warn(e) })
        }
    }

    getNextPage() {
        this.setState((state) => ({ currentPage: state.currentPage + 1 }))
        axios.get(`https://api.pokemontcg.io/v1/cards?page=${this.state.currentPage + 1}`)
            .then(res => { this.props.setNextCards(res.data.cards) })
            .catch(e => { console.warn(e) })
    }

    render() {
        return (
            <div className="pagination">
                <span className="pagination-button" onClick={this.getPreviousPage}>Previous page</span>
                <span className="pagination-current_page">Current page {this.state.currentPage}</span>
                <span className="pagination-button" onClick={this.getNextPage}>Next page</span>
            </div>
        );
    }
}
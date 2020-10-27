import React from 'react';
import '../styles/Pagination.scss'
import axios from "axios";

export class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: 1, totalCount: 0, pageSize: 0, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
        this.getPreviousPage = this.getPreviousPage.bind(this)
        this.getNextPage = this.getNextPage.bind(this)
        this.setPage = this.setPage.bind(this)
    }

    getPreviousPage() {
        if(this.state.currentPage > 1) {
            this.props.currentPage(this.state.currentPage - 1)
            axios.get(`https://api.pokemontcg.io/v1/cards`, { params: { page: this.state.currentPage - 1, types: this.props.type, subtype: this.props.subtype }})
                .then(res => {
                    this.props.setCards(res.data.cards)
                    this.setState({ totalCount: res.headers['total-count'] })
                    this.setState({ pageSize: res.headers['page-size'] })
                    })
                .catch(e => { console.warn(e) })
            this.setState((state) => ({ currentPage: state.currentPage - 1 }))
            if(this.state.pages[0] !== 1) this.setState((state) => ({ pages: state.pages = state.pages.reduce(function(preVal, page, index) {
                if(index === 0) {
                    preVal.push(state.pages[0] - 1)
                    preVal.push(page)
                } else preVal.push(page)
                return preVal
                }, []).filter((page, index, pages) => index !== pages.length - 1)}))
        }
    }

    setPage(event) {
        this.props.currentPage(Number(event.target.textContent))
        axios.get(`https://api.pokemontcg.io/v1/cards`, { params: { page: Number(event.target.textContent), types: this.props.type, subtype: this.props.subtype }})
            .then(res => {
                this.props.setCards(res.data.cards)
                this.setState({ totalCount: res.headers['total-count'] })
                this.setState({ pageSize: res.headers['page-size'] })
            })
            .catch(e => { console.warn(e) })
        this.setState((state) => ({ currentPage: Number(event.target.textContent)}))
    }

    getNextPage() {
        this.props.currentPage(this.state.currentPage + 1)
        axios.get(`https://api.pokemontcg.io/v1/cards`, { params: { page: this.state.currentPage + 1, types: this.props.type, subtype: this.props.subtype }})
            .then(res => {
                this.props.setCards(res.data.cards)
                this.setState({ totalCount: res.headers['total-count'] })
                this.setState({ pageSize: res.headers['page-size'] })
            })
            .catch(e => { console.warn(e) })
        this.setState((state) => ({ currentPage: state.currentPage + 1 }))
        if(this.state.currentPage + 1 > this.state.pages.length) this.setState((state) => ({ pages: state.pages = state.pages.concat([state.pages[state.pages.length - 1] + 1]).filter((page, index) => index !== 0) }))
    }

    render() {
        const pages = this.state.pages.map(page => <span className={this.state.currentPage === page ? "pagination-control-page_control-pages-active_page" : "pagination-control-page_control-pages-current_page"} onClick={this.setPage}>{page}</span>)
        return (
            <div className="pagination">
                <div className="pagination-control">
                    <div className="pagination-control-page_control">
                        <span className="pagination-control-page_control-button" onClick={this.getPreviousPage}>&#8249;</span>
                        <div className="pagination-control-page_control-pages">{pages}</div>
                        <span className="pagination-control-page_control-button" onClick={this.getNextPage}>&#8250;</span>
                    </div>
                </div>
                <div className="pagination-total_counts">
                    <span>{this.props.pageSize ? this.props.pageSize : this.state.pageSize}</span>
                    <span>{this.props.totalCount ? this.props.totalCount : this.state.totalCount}</span>
                </div>
            </div>
        );
    }
}
import React from 'react';
import '../styles/Header.scss'
import { Link } from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const cardTable = <div className="header-card_table">
                                <Link to="/login" className="header-logout">Logout</Link>
                          </div>
        const currentPage = <div className="header-current_page">
                                <Link to="/cards" className="header-back">&#8249; Back</Link>
                                <Link to="/login" className="header-logout">Logout</Link>
                            </div>
        return (<div>{this.props.backButton ? currentPage : cardTable}</div>)
    }
}
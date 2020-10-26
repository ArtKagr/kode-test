import React from 'react';
import '../styles/Header.scss'
import {Link} from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const cardTable = <div className="header-card_table">
                                <p className="header-logout">Logout</p>
                          </div>
        const currentPage = <div className="header-current_page">
                                <Link to={`/cards`} className="header-back">Back</Link>
                                <p className="header-logout">Logout</p>
                            </div>
        return (<div>{this.props.backButton ? currentPage : cardTable}</div>)
    }
}
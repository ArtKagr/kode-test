import React from 'react';
import '../styles/Header.scss'

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="header">
                <p className="header-logout">Logout</p>
            </div>
        )
    }
}
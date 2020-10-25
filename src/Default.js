import React from 'react'
import {Header} from './components/Header'
import {CardTable} from "./components/Cards/CardsTable";

export class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cards: [] }
    }

    render() {
        return (
            <div className="default">
                <Header />
                <CardTable />
            </div>
        )
    }
}
import React from 'react'
import {Header} from './components/Header'
import {MainContent} from "./components/MainContent"
import axios from "axios";

export class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cards: [] }
    }

    render() {
        return (
            <div className="default">
                <Header />
                <MainContent />
            </div>
        )
    }
}
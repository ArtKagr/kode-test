import React from 'react';
import {Header} from './components/Header'
import {MainContent} from "./components/MainContent";

export class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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
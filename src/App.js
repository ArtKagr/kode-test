import React from 'react';
import {Default} from "./Default";
import './styles/App.scss';
import './styles/Default.scss';
import {getCards} from './store/actions/getCards'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.getCards = getCards.bind(this)
    }
    componentDidMount() {
        this.getCards()
    }

    render() {
        return (
            <div className="app">
                <Default className="default" />
            </div>
        )
    }
}

export default App;

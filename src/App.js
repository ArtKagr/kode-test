import React from 'react';
import './styles/App.scss';
import './styles/Default.scss';
import {getCards} from './store/actions/getCards'
import {Header} from "./components/Header";
import {CardTable} from "./components/Cards/CardsTable";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Link } from "react-router-dom"
import {CurrentCard} from "./components/Card/CurrentCard";

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <div className="app">
                    <Router>
                            <Switch>
                                <Route exact path="/cards">
                                    <Header backButton={false}/>
                                    <CardTable />
                                </Route>
                                <Route exact path="/cards/:id">
                                    <Header backButton={true}/>
                                    <CurrentCard/>
                                </Route>
                            </Switch>
                            <Redirect from='/' to='/cards'/>
                    </Router>
                </div>
        )
    }
}

export default App;

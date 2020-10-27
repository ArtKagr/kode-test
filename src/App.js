import React from 'react';
import './styles/App.scss';
import {Header} from "./components/Header";
import {CardTable} from "./components/Cards/CardsTable";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import {CurrentCard} from "./components/Card/CurrentCard";
import {Login} from "./components/Login";
import {OneTimePassword} from "./components/OneTimePassword";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
                <div className="app">
                    <Router>
                            <Switch>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                                <Route exact path="/otp">
                                    <OneTimePassword />
                                </Route>
                                <Route exact path="/cards">
                                    <Header backButton={false}/>
                                    <CardTable />
                                </Route>
                                <Route exact path="/cards/:id">
                                    <Header backButton={true}/>
                                    <CurrentCard/>
                                </Route>
                            </Switch>
                            <Redirect from='/' to='/login'/>
                    </Router>
                </div>
        )
    }
}

export default App;

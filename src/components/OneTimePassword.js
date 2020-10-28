import React from 'react';
import { Link } from "react-router-dom"
import otpGenerator from 'otp-generator'
import '../styles/Login.scss'

export class OneTimePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = { otpPassword: null, password: null, accept: false }
        this.setPassword = this.setPassword.bind(this)
    }

    componentDidMount() {
        const password = otpGenerator.generate(6, {digits: true, alphabets: true, upperCase: true, specialChars: false})
        this.setState( { otpPassword: password })
        alert(`Save your password: ${password}`)
    }

    setPassword(event) {
        this.setState({password: event.target.value})
        this.setState((state) => ({ accept: event.target.value === state.otpPassword }))
    }

    render() {
        const button = this.state.accept
            ? <Link to={`/cards`}>
                <div className="login-container-button"/>
              </Link>
            : <div className="login-container-button_disabled"/>
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-container-email">
                        <span className="login-container-email-title">Code from SMS</span>
                        <input className="login-container-email-value" placeholder="Enter login" onKeyUp={this.setPassword}/>
                    </div>
                    <div>{button}</div>
                </div>
            </div>
        );
    }
}
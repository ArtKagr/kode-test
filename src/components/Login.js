import React from 'react';
import { Link } from "react-router-dom"
import '../styles/Login.scss'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { login: null, password: null, currentLogin: 'kode@kode.ru', currentPassword: 'Enk0deng', accept: false }
        this.setLogin = this.setLogin.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }

    setLogin(event) {
        this.setState((state) => ({
            login: event.target.value,
            accept: event.target.value === state.currentLogin && state.password === state.currentPassword
        }))
        if(this.state.accept) localStorage.setItem('login', this.state.login)
    }

    setPassword(event) {
        this.setState((state) => ({
            password: event.target.value,
            accept: state.login === state.currentLogin && event.target.value === state.currentPassword
        }))
        if(this.state.accept) localStorage.setItem('password', this.state.password)
    }

    componentDidMount() {
        this.setState((state) => ({
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            accept: localStorage.getItem('login') === state.currentLogin && localStorage.getItem('password') === state.currentPassword
        }))
    }

    render() {
        const button = this.state.accept
                        ? <Link to={`/otp`}><div className="login-container-button"/></Link>
                        : <div className="login-container-button_disabled"/>
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-container-email">
                        <span className="login-container-email-title">Login</span>
                        <input className="login-container-email-value" placeholder={this.state.login ? this.state.login : 'Enter login'} onKeyUp={this.setLogin} />
                    </div>
                    <div className="login-container-password">
                        <span className="login-container-password-title">Password</span>
                        <input className="login-container-password-value" type="password" placeholder={this.state.password ? 'Correct password' : 'Enter password'} onKeyUp={this.setPassword} />
                    </div>
                    <div>{button}</div>
                </div>
            </div>
        );
    }
}
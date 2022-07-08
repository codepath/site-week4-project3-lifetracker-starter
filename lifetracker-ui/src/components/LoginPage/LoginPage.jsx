import * as React from "react"
import LoginForm  from "../LoginForm/LoginForm"
import { Link } from "react-router-dom"
import "./LoginPage.css"

export default function LoginPage(props) {
    return (
      <div className="login-page">
        <div className="card">
            <h2>Login</h2>
            <LoginForm isLogged={props.isLogged} setIsLogged={props.setIsLogged} loginForm={props.loginForm} setLoginForm={props.setLoginForm} error={props.error} setError={props.setError}/>
            <div className="footer">
                <p>
                    Don't have an account? Sign up
                    <Link to="/register"> here.</Link>
                </p>
            </div>
        </div>
        
      </div>
    )
  }


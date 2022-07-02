import * as React from "react"
import LoginForm from "../LoginPage/LoginForm"
import "../LoginPage/login.css"

export default function LoginPage(props) {
  return (
    <div className = "login-page">
        <LoginForm userLoggedIn={props.userLoggedIn}
                  setUserLoggedIn={props.setUserLoggedIn}
                  error={props.error}
                  setError={props.setError}/>
    </div>
  )
}
import * as React from "react"
import LoginForm from "./LoginForm"
import "./LoginPage.css"

export default function LoginPage(props) {
  return (
    <div className="login-page">
        <LoginForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
    </div>
  )
}
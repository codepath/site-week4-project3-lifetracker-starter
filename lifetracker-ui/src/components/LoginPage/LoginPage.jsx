import ActivityPage from "components/ActivityPage/ActivityPage"
import LoginForm from "components/LoginForm/LoginForm"
import * as React from "react"
import "./LoginPage.css"

export default function LoginPage(props) {
    console.log("TODO: change login from useState to context")
    return (
        <div className="login-page">
            <LoginForm user={props.user} setUser={props.setUser}/>
            
        </div>
    )}
import LoginForm from "components/LoginForm/LoginForm"
import * as React from "react"

export default function LoginPage(props) {

    return (
        <div className="login-page">
            <LoginForm user={props.user} setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn}/>
        </div>
        
    )
}

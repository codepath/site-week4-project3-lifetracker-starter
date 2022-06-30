import LoginForm from "components/LoginForm/LoginForm"
import * as React from "react"

export default function LoginPage(props) {

    return (
        <div className="login-page">
            <LoginForm setIsLoggedIn={props.setIsLoggedIn}/>
        </div>
        
    )
}

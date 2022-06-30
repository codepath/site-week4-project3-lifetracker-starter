import * as React from "react"
import "../LoginPage/login.css"

export default function LoginForm() {
    return(
        <div className="login-form">
            <h1>Login</h1>

            <div>
            <h3>Email</h3>
            <input type="email" 
                   placeholder="Type in email..."
                   name="email"
                   onChange = ""
                   className="form-input" />
            </div>

            <div>
            <h3>Password</h3>
            <input type="text" 
                   placeholder="Type in password..."
                   name="password"
                   onChange = ""
                   className="form-input" />
            </div>
            
            <br></br>
            <button className="submit-login"> Login </button>
        </div>
    )
}
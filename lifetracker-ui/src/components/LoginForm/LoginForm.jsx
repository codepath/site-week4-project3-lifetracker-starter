import "./LoginForm.css"
import * as React from "react"

export default function LoginForm( {} ) {
    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: "",
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") <= 0) 
            {
                console.log("Invalid email")
            // setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else 
            {

                console.log("is good, continue")
            // setErrors((e) => ({ ...e, email: null }))
            }
        }
        
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = () => {
        // here is where I would make the post request to the back end api
    }

    return (
        <div className="login-form">
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <br/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="user@gmail.com" 
                    value={loginForm.email}
                    onChange={handleOnInputChange}></input>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <br/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={loginForm.password}
                    onChange={handleOnInputChange}></input>
            </div>
            <button className="btn" onClick={handleOnSubmit}>Log In</button>
        </div>
    )
}
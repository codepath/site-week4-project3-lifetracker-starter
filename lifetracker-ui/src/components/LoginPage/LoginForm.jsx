import * as React from "react"
import "../LoginPage/login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {useState} from "react"

export default function LoginForm(props) {
    //VARIABLES
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    function handleOnChange(evt)
    {
        if(evt.target.name === "email")
        {
            if(evt.target.value.indexOf("@") === -1)
            {
                props.setError("Enter a valid email")
            }
            else
            {
                props.setError("")
            }
        }

        setLoginForm((form) => ({...form, [evt.target.name]: evt.target.value}))
    }

    async function handleOnSubmit(evt)
    {
        evt.preventDefault();
        props.setError("")
        const response = await axios.post("http://localhost:3001/auth/login", {email: loginForm.email, password: loginForm.password})
        .then((response) => {
            props.setUserLoggedIn(true)
            navigate("/activity")
        })
        .catch((error) => {
            props.setError(error)
        })
    }


    return(
        <div className="login-form">
            <h1>Login</h1>

            <h3>{props.error}</h3>

            <div>
            <h3>Email</h3>
            <input type="email" 
                   placeholder="Type in email..."
                   name="email"
                   onChange = {(evt) => {handleOnChange(evt)}}
                   className="form-input" />
            </div>

            <div>
            <h3>Password</h3>
            <input type="password" 
                   placeholder="Type in password..."
                   name="password"
                   onChange = {(evt) => {handleOnChange(evt)}}
                   className="form-input" />
            </div>
            
            <br></br>
            <Link to="/activity"><button className="submit-login" onClick={(evt) => {handleOnSubmit(evt)}}> Login </button></Link>
        </div>
    )
}
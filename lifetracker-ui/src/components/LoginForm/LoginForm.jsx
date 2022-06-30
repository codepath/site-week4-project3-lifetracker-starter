import * as React from "react"
import { useState } from "react"
import axios from "axios"
import "./LoginForm.css"

export default function LoginForm(props) {
    const [form, setForm] = useState({email: "", password: ""})
    const [error, setError] = useState({})
    
    const handleOnInputChange = (event) => {
        // Check for valid email
        if (event.target.name == "email") {
          if (event.target.value.indexOf("@") == -1) {
            setError((state) => ({ ...state, email: "Please enter a valid email." }))
          } 
          else {
            setError((state) => ({ ...state, email: null }))
          }
        }
        else {
            setError((state) => ({ ...state, password: null }))
        }
        setForm((state) => ({ ...state, [event.target.name]: event.target.value }))
    }

    const loginUser = async (e) => {
        e.preventDefault()
        if (!form.password){
            setError((state) => ({ ...state, password: "You must enter a password." }))
            return
        }
        //placeholder, handled by contexts
        try{
            const json = await axios.post("http://localhost:3001/auth/login", {
                email: form.email,
                password: form.password,
            })
            if(json?.data?.user){
                props.setAppState(json.data)
                setForm({
                    email: "",
                    password: ""
                  })
                console.log(json.data)
                props.setIsLoggedIn(true)
            }
            else{
                setError((state) => ({ ...state, form: "Something went wrong with registration." }))
            }
        }catch(err) {
            const message = err?.response?.data?.error?.message
            setError((state) => ({ ...state, form: message ? String(message) : String(err) }))
            console.log(err)
        }
        console.log(error)
    }

    return (
        <div className="login-form">
                <h1>Login</h1>
                <img src="\src\assets\icons8-login-60.png"></img>
            <form>
                <input className="form-input" type="email" name="email"
                    placeholder="user@gmail.com"
                    value={form.email}
                    onChange={handleOnInputChange}/>
                {error.email ? (<p className="error">{error.email}</p>) : null}
                <input className="form-input" type="password" name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleOnInputChange}/>
                {error.password ? (<p className="error">{error.password}</p>) : null}
                <button className="submit-login" onClick={loginUser}>Login</button>
                {error.form ? (<p className="error">{error.form}</p>) : null}
            </form>
        </div>
    )}
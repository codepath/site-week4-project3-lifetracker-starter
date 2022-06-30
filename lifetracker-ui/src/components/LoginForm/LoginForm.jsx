import * as React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./LoginForm.css"

export default function LoginForm(props) {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      email: "",
      password: "",
    })
  
    const handleOnInputChange = (event) => {
      if (event.target.name === "email") {
        if (event.target.value.indexOf("@") === -1) {
          setErrors((error) => ({ ...error, email: "Please enter a valid email." }))
        } else {
          setErrors((error) => ({ ...error, email: null }))
        }
      }
  
      setForm((form) => ({ ...form, [event.target.name]: event.target.value }))
    }
  
    const handleOnSubmit = async (event) => {
      event.preventDefault()
      setIsLoading(true)
      setErrors((error) => ({ ...error, form: null }))
  
      try {
        const res = await axios.post(`http://localhost:3001/auth/login`, form)
        if (res?.data.user) {
        //   setAppState(res.data)
          props.setIsLoggedIn(true)
        //   setIsLoading(false)
        props.setUser(res.data.user)
          navigate("/activity")
        } else {
          setErrors((error) => ({ ...error, form: "Invalid username/password combination" }))
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setErrors((error) => ({ ...error, form: message ? String(message) : String(err) }))
        setIsLoading(false)
      }
    }

    return (

        <div className="login-form">
            
            <div className="login-container">
            <h1>Login</h1>
                <div className="input-field">
                    <i className="fa fa-envelope"></i>
                    <input className="form-input" type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange} />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input className="form-input" type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange} />
                </div>
                <div className="input-field">
                    <button className="login-btn" onClick={handleOnSubmit} >Login</button>
                </div>
                </div>
                <div className="register-redirect">
                <p>Don't have an account? Sign up <Link to="/register"><span>here.</span></Link></p>
            </div>
         </div>
    )
}
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"

export default function LoginForm(props) {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    props.setIsLoggedIn(true)
    navigate("/activity")
  }

  return (
    <div className="login-form">
        <form>
            <label for="email"> Email: </label>
            <input id="email" 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleOnInputChange} 
            placeholder="user@gmail.com" />

            <label for="password">Password: </label>
            <input id="password" 
            type="password" 
            name="password" 
            value={form.password}
            onChange={handleOnInputChange} 
            placeholder="password" />
            <button className="submit-login" onClick={handleOnSubmit}>Login</button>
        </form> 
    </div>
  )
}
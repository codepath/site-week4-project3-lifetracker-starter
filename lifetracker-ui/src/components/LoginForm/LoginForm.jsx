import * as React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginForm(props) {
  
  let navigate = useNavigate();

  function handleChange(evt){
    props.setLoginForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function loginUser(evt){

    evt.preventDefault()

    if(props.loginForm.email == "" || props.loginForm.password == ""){
      props.setError("Missing an input value")
      return
    }
    else if(props.loginForm.email.indexOf("@") < 0){
      props.setError("Please enter a valid email")
      return
    }
    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, props.loginForm)
      if(res?.data){
        props.setIsLogged(true)
        props.setError("")
        props.setLoginForm({"email" : "", "password": ""})
        navigate("/activity")
      }
    } catch (err) {
      props.setError("Wrong email or password")
    }
  }

    return (
      <div className="login-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="user@gmail.com" defaultValue={props.loginForm.email} onChange={handleChange}></input>
            {props.error != ""?  <span className="error">{props.error}</span>: null}
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="password" defaultValue={props.loginForm.password} onChange={handleChange}></input>
        </div>
        <button className="btn" onClick={loginUser}>Login</button>
      </div>
    )
  }
import * as React from "react"
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  
  let navigate = useNavigate();

  function handleChange(evt){
    props.setLoginForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function handleSubmit(evt){
    evt.preventDefault()
    props.setIsLogged(true);
    navigate("/activity")
  }

    return (
      <div className="login-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="user@gmail.com" defaultValue={props.loginForm.email} onChange={handleChange}></input>
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="password" defaultValue={props.loginForm.password} onChange={handleChange}></input>
        </div>
        <button className="btn" onClick={handleSubmit}>Login</button>
      </div>
    )
  }
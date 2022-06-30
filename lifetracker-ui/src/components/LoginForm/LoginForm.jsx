import * as React from "react"
import { useNavigate } from "react-router-dom"

export default function LoginForm(props) {
  
  let navigate = useNavigate();

  function handleChange(evt){
    props.setLoginForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function loginUser(evt){
    if(props.loginForm.email == "" || props.loginForm.password == ""){
      props.setError(0)
      return
    }
    else if(props.loginForm.email.indexOf("@") < 0){
      props.setError(1)
      return
    }
    else{
      console.log()
      evt.preventDefault()
      props.setIsLogged(true)
      props.setError(-1)
      props.setLoginForm({"email" : "", "password": ""})
      navigate("/activity")
    }
  }

    return (
      <div className="login-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="user@gmail.com" defaultValue={props.loginForm.email} onChange={handleChange}></input>
            {props.error == 1 ?  <span className="error">Invalid email</span>: null}
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="password" defaultValue={props.loginForm.password} onChange={handleChange}></input>
            {props.error == 0 ?  <span className="error">You're missing an input value</span>: null}
        </div>
        <button className="btn" onClick={loginUser}>Login</button>
      </div>
    )
  }
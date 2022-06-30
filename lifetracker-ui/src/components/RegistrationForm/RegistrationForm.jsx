import * as React from "react"
import { useNavigate } from "react-router-dom"

export default function RegistrationForm(props) {
    let navigate = useNavigate()

  function handleChange(evt){
    props.setRegistrationForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function signupUser(evt){
    if(props.registrationForm.email == "" || props.registrationForm.password == "" || props.registrationForm.firstName == "" || props.registrationForm.lastName == "" || props.registrationForm.passwordConfirm == "" || props.registrationForm.username == ""){
      props.setError(0)
      return
    }
    else if(props.registrationForm.email.indexOf("@") < 0){
      props.setError(1)
      return
    }
    else if(props.registrationForm.password != props.registrationForm.passwordConfirm){
        props.setError(3)
        return
    }
    else{
      console.log()
      evt.preventDefault()
      props.setIsLogged(true)
      props.setError(-1)
      props.setRegistrationForm({"email" : "", "username" : "", "fisrtName" : "", "lastName" : "", "password" : "", "passwordConfirm" : ""})
      navigate("/activity")
    }
  }

    return (
      <div className="registration-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="Enter a valid email" onChange={handleChange} defaultValue={props.registrationForm.email}></input>
            {props.error == 1 ?  <span className="error">Invalid email</span>: null}
        </div>
        <div className="input-field">
            <label>Username</label>
            <input className="form-input" type="text" name="username" placeholder="your_username" onChange={handleChange} defaultValue={props.registrationForm.username}></input>
        </div>
        <div className="split-input-field">
            <div className="input-field">
                <input className="form-input" type="text" name="firstName" placeholder="First Name" onChange={handleChange} defaultValue={props.registrationForm.firstName}></input>
            </div>
            <div className="input-field">
                <input className="form-input" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} defaultValue={props.registrationForm.lastName}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="Enter a secure password" onChange={handleChange} defaultValue={props.registrationForm.password}></input>
        </div>
        <div className="input-field">
            <label>Confirm Password</label>
            <input className="form-input" name="passwordConfirm" placeholder="Confirm your password" onChange={handleChange} defaultValue={props.registrationForm.passwordConfirm}></input>
            {props.error == 3 ?  <span className="error">Passwords don't match</span>: null}
            {props.error == 0 ?  <span className="error">You're missing an input value</span>: null}
        </div>
        <button className="btn" onClick={signupUser}>Create Account</button>
      </div>
    )
  }
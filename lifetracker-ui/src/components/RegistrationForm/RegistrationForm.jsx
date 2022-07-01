import axios from "axios"
import * as React from "react"
import { useNavigate } from "react-router-dom"

export default function RegistrationForm(props) {
    let navigate = useNavigate()

  function handleChange(evt){
    props.setRegistrationForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function signupUser(evt){

    evt.preventDefault()

    if(props.registrationForm.email == "" || props.registrationForm.password == "" || props.registrationForm.firstName == "" || props.registrationForm.lastName == "" || props.registrationForm.passwordConfirm == "" || props.registrationForm.username == ""){
      props.setError("Missing input value")
      return
    }
    else if(props.registrationForm.email.indexOf("@") < 0){
      props.setError("Invalid email")
      return
    }
    else if(props.registrationForm.password != props.registrationForm.passwordConfirm){
        props.setError("Passwords don't match")
        return
    }
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        email: props.registrationForm.email,
        username: props.registrationForm.username,
        password: props.registrationForm.password,
        firstName: props.registrationForm.firstName,
        lastName: props.registrationForm.lastName,
      })

      if(res?.data?.user){
      props.setIsLogged(true)
      props.setError("")
      props.setRegistrationForm({"email" : "", "username" : "", "fisrtName" : "", "lastName" : "", "password" : "", "passwordConfirm" : ""})
      navigate("/activity")
      }

    } catch(err) {
      if(props.error == ""){
        props.setError("Email or Username already in use")
      }
    } 
  }

    return (
      <div className="registration-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="Enter a valid email" onChange={handleChange} defaultValue={props.registrationForm.email}></input>
            {props.error != "" ?  <span className="error">{props.error}</span>: null}
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
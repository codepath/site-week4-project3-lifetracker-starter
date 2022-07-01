import * as React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(props) {       
  //VARIABLES
  const navigate = useNavigate()

  //FUNCTION FOR WHEN A USER IS INPUTTING INFORMATION
  function handleOnChange(evt)
  {
       if(evt.target.name === "password")
       {
              if(props.form.passwordConfirm && props.form.passwordConfirm !== evt.target.value)
              {
                     props.setError("Passwords do not match")
              }
              else
              {
                     props.setError("")
              }
       }
       if(evt.target.name === "passwordConfirm")
       {
              if(props.form.password && props.form.password !== evt.target.value)
              {
                     props.setError("Passwords do not match")
              }
              else
              {
                     props.setError("")
              }
       }
       if(evt.target.name === "email")
       {
              if(evt.target.value.indexOf("@") === -1)
              {
                     props.setError("Please Enter a valid email.")
              }
              else
              {
                     props.setError("")
              }
       }


       props.setForm((formInput) => ({...formInput, [evt.target.name]: evt.target.value}))
  }

  //FUNCTION FOR WHEN A USER SUBMITS FORM
  async function handleOnSubmit(evt)
  {
       if(props.form.passwordConfirm !== props.form.password)
       {
              setError("Passwords do not match! Try again!")
       }
       else
       {
              setError("")
       }

       evt.preventDefault();
       const response = await axios.post("http://localhost:3001/auth/register", {
              email: props.form.email,
              username: props.form.username,
              firstName: props.form.firstName,
              lastName: props.form.lastName,
              password: props.form.password,
       })
       .then((response) => {
              setUserLoggedIn(true)
              navigate("/login")
       })
       .catch((error) => {
              props.setError("Invalid Registration Form! Try Again!")
       })
       
  }

  return (
    <div className="registration-form">
        <h1>Register</h1>
       
        <h4>{props.error}</h4>

        <h3>Email</h3>
        <input className="form-input"
               name="email"
               type="email"
               placeholder="Enter email ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Username</h3>
        <input className="form-input"
               name="username"
               type="text"
               placeholder="Enter username ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>First Name</h3>
        <input className="form-input"
               name="firstName"
               type="text"
               placeholder="Enter first name ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Last Name</h3>
        <input className="form-input"
               name="lastName"
               type="text"
               placeholder="Enter last name ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Password</h3>
        <input className="form-input"
               name="password"
               type="password"
               placeholder="Enter password ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <h3>Password Confirm</h3>
        <input className="form-input"
               name="passwordConfirm"
               type="password"
               placeholder="Confirm password ..."
               onChange = {(evt) => handleOnChange(evt)}></input>

        <br></br>
        <button className="submit-registration" onClick={(evt) => handleOnSubmit(evt)}>Create Account</button>
    </div>
  )
}
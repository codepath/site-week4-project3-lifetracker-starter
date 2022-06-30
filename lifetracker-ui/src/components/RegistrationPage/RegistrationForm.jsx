import * as React from "react"

export default function RegistrationForm() {
  return (
    <div className="registration-form">
        <h1>Register</h1>

        <h3>Email</h3>
        <input className="form-input"
               name="email"
               type="email"
               placeholder="Enter email ..."
               onChange = ""></input>

        <h3>Username</h3>
        <input className="form-input"
               name="username"
               type="text"
               placeholder="Enter username ..."
               onChange = ""></input>

        <h3>First Name</h3>
        <input className="form-input"
               name="firstName"
               type="text"
               placeholder="Enter first name ..."
               onChange = ""></input>

        <h3>Last Name</h3>
        <input className="form-input"
               name="lastName"
               type="text"
               placeholder="Enter last name ..."
               onChange = ""></input>

        <h3>Password</h3>
        <input className="form-input"
               name="password"
               type="text"
               placeholder="Enter password ..."
               onChange = ""></input>

        <h3>Password Confirm</h3>
        <input className="form-input"
               name="passwordConfirm"
               type="text"
               placeholder="Confirm password ..."
               onChange = ""></input>

        <br></br>
        <button className="submit-registration">Create Account</button>
    </div>
  )
}
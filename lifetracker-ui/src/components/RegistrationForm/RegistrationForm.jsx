import * as React from "react"

export default function RegistrationForm() {
    return (
      <div className="registration-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="Enter a valid email" ></input>
        </div>
        <div className="input-field">
            <label>Username</label>
            <input className="form-input" type="text" name="username" placeholder="your_username" ></input>
        </div>
        <div className="split-input-field">
            <div className="input-field">
                <input className="form-input" type="text" name="firstName" placeholder="First Name" ></input>
            </div>
            <div className="input-field">
                <input className="form-input" type="text" name="lastName" placeholder="Last Name" ></input>
            </div>
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="Enter a secure password" ></input>
        </div>
        <div className="input-field">
            <label>Confirm Password</label>
            <input className="form-input" name="passwordConfirm" placeholder="Confirm your password" ></input>
        </div>
        <button className="btn">Create Account</button>
      </div>
    )
  }
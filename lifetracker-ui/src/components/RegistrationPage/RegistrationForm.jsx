import * as React from "react"
import "./RegistrationPage.css"

export default function RegistrationForm() {
  return (
    <div className="registration-form">
        <form>
            <label for="email"> Email: </label>
            <input id="email" type="email" name="email" placeholder="Enter a valid email" value="" />
            <label for="username"> Username: </label>
            <input id="username" type="text" name="username" placeholder="Enter a username" value="" />
            <label for="first-name"> First Name: </label>
            <input id="first-name" type="text" name="first-name" placeholder="First Name" value="" />
            <label for="last-name">Last Name: </label>
            <input id="last-name" type="text" name="last-name" placeholder="Last Name" value="" />
            <label for="password">Password: </label>
            <input id="password" type="password" name="password" placeholder="Enter a secure password" value="" />
            <label for="password-confirm">Confirm Password: </label>
            <input id="password-confirm" type="password" name="password-confirm" placeholder="Confirm your password" value="" />
            <button class="submit-registration">Create Account</button>
        </form> 
    </div>
  )
}
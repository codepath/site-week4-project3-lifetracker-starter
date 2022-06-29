import * as React from "react"
import "./LoginPage.css"

export default function LoginForm() {
  return (
    <div className="login-form">
        <form>
            <label for="email"> Email: </label>
            <input id="email" type="email" name="email" placeholder="user@gmail.com" value="" />
            <label for="password">Password: </label>
            <input id="password" type="password" name="password" placeholder="password" value="" />
            <button class="submit-login">Login</button>
        </form> 
    </div>
  )
}
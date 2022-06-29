import "./LoginPage.css"
import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import { useNavigate } from "react-router-dom"


export default function LoginPage( { isLoggedIn } ) {
  const navigate = useNavigate()

  return (
    <>
      <div className="login-page">
        <h3>
          Log In...
        </h3>
        { isLoggedIn ?
          navigate("/activity")
        :
          <LoginForm />
        }
      </div>
    </>
  )
}
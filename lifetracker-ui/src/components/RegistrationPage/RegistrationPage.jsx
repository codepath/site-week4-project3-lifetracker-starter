import "./RegistrationPage.css"
import * as React from "react"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import { useNavigate } from "react-router-dom"
// somehow redirect them if already logged in
// not sure whether to use linked or not

export default function RegistrationPage( { isLoggedIn } ) {
    const navigate = useNavigate()

  return (
      <>
      <div className="registration-page">
        <h3>
          Sign Up...
        </h3>
        { isLoggedIn ?
          navigate("/activity")
        :
          <RegistrationForm />
        }
      </div>
    </>
    
  )
}
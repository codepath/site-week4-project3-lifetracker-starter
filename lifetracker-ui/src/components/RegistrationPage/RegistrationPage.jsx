import * as React from "react"
import RegistrationForm from "components/RegistrationForm/RegistrationForm"
import { Link } from "react-router-dom"
import "./RegistrationPage.css"

export default function RegistrationPage(props) {
    return (
      <div className="registration-page">
        <div className="card">
            <h2>Register</h2>
            <RegistrationForm isLogged={props.isLogged} setIsLogged={props.setIsLogged} registrationForm={props.registrationForm} setRegistrationForm={props.setRegistrationForm} error={props.error} setError={props.setError}/>
            <div className="footer">
                <p>
                    Already have an account? Login
                    <Link to="/login"> here.</Link>
                </p>
            </div>
        </div>
        
      </div>
    )
  }

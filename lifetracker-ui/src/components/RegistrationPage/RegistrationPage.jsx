import * as React from "react"
import RegistrationForm from "components/RegistrationForm/RegistrationForm"
import { Link } from "react-router-dom"
import "./RegistrationPage.css"

export default function RegistrationPage() {
    return (
      <div className="registration-page">
        <div className="card">
            <h2>Register</h2>
            <RegistrationForm />
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

import RegistrationForm from "components/RegistrationForm/RegistrationForm"
import * as React from "react"
 
export default function RegistrationPage(props) {
    return (
        <div className="registration-page">
            <RegistrationForm user={props.user} setUser={props.setUser} />
        </div>
    )
}
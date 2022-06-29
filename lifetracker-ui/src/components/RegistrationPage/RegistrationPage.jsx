import RegistrationForm from "components/RegistrationForm/RegistrationForm"
import * as React from "react"
import "./RegistrationPage.css"

export default function RegistrationPage(props) {
    return (
        <div className="registration-page">
            {props.isLoggedIn ? (<ActivityPage/>) : (<RegistrationForm setIsLoggedIn={props.setIsLoggedIn} setAppState={props.setAppState}/>)}
        </div>
    )}
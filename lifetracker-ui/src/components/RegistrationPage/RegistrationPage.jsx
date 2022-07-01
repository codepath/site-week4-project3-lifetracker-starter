import * as React from "react"
import RegistrationForm from "../RegistrationPage/RegistrationForm"
import { useNavigate } from "react-router-dom";

export default function RegistrationPage(props) {
  //VARIABLES
  const navigate = useNavigate()

  return (
    <div className="registration-page">
        {props.userLoggedIn ? (navigate("/activity")) : 
        <RegistrationForm form={props.form} setForm={props.setForm} error={props.error} setError={props.setError}/>}
    </div>
  )
}
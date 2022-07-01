import * as React from "react"
import RegistrationForm from "../RegistrationPage/RegistrationForm"

export default function RegistrationPage(props) {
  return (
    <div className="registration-page">
        <RegistrationForm form={props.form} setForm={props.setForm}/>
    </div>
  )
}
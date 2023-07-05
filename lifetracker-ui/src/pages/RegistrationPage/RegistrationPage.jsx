import "./RegistrationPage.css"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"

export default function RegistrationPage({ setAppState }) {
    return (
        <div className="registration-page">
            <RegistrationForm setAppState={setAppState}/>
        </div>
    )
}
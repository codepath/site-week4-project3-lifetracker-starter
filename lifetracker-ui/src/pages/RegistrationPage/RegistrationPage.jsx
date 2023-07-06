import "./RegistrationPage.css"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"

export default function RegistrationPage({ setAppState, appState }) {
    return (
        <div className="registration-page">
            <RegistrationForm setAppState={setAppState} appState={appState}/>
        </div>
    )
}
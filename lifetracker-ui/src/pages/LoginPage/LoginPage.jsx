import "./LoginPage.css"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function LoginPage({setAppState}) {
    return (
        <div className="login-page">
            <LoginForm setAppState={setAppState}/>
        </div>
    )
}
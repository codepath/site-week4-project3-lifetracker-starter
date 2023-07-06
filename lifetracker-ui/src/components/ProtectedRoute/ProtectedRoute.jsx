import "./ProtectedRoute.css"
import LoginPage from "../../pages/LoginPage/LoginPage"

export default function ProtectedRoute({ setAppState, appState}){
    if(!appState.isAuthenticated) {
        return (
            <div>
                <LoginPage/>
            </div>
        )
    }
    else {
        
    }
}
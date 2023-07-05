import "./Navlinks.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiClient"

export default function NavLinks({ appState, setAppState }) {
  if (!appState.user) {
    return (
      <div className="nav-links">
        <ul className="links">
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  }

  else {

    function logoutUser() {
      setAppState({user:""})
      apiClient.logoutUser()
    }
    return (
      <div className="nav-links">
        <ul className="links">
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li onClick={logoutUser}>
            Log Out
          </li>
        </ul>
      </div>
    )
  }
  
}

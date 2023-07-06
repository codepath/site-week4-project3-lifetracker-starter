import "./Navlinks.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function NavLinks({ appState, setAppState }) {
  const navigate = useNavigate();
  if (!appState.isAuthenticated) {
    return (
      <div className="nav-links">
        <ul className="links">
          <li>
            <Link to="/nutrition">Nutrition</Link>
          </li>
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
  } else {
    function logoutUser() {
      setAppState({ ...appState, user: "", isAuthenticated: false, token: "" });
      apiClient.logoutUser();
      navigate("/");
      window.location.reload(true);
    }
    return (
      <div className="nav-links">
        <ul className="links">
          <li>
            <Link to="/nutrition">Nutrition</Link>
          </li>
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li onClick={logoutUser}>Log Out</li>
        </ul>
      </div>
    );
  }
}

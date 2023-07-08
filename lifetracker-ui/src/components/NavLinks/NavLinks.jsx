import "./NavLinks.css";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";

export default function NavLinks({ appState, setAppState }) {
  const navigate = useNavigate();
  if (!appState.user) {
    return (
      <div className="nav-links">
        <ul className="links">
          <li
            onClick={() => {
              navigate("/exercise");
            }}
          >
            <Link to="/exercise">Exercise</Link>
          </li>
          <li
            onClick={() => {
              navigate("/sleep");
            }}
          >
            <Link to="/sleep">Sleep</Link>
          </li>
          <li
            onClick={() => {
              navigate("/nutrition");
            }}
          >
            <Link to="/nutrition">Nutrition</Link>
          </li>
          <li
            onClick={() => {
              navigate("/activity");
            }}
          >
            <Link to="/activity">Activity</Link>
          </li>
          <li
            onClick={() => {
              navigate("/login");
            }}
          >
            <Link to="/login">Login</Link>
          </li>
          <li onClick={<Link to="/register" />}>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  } else {
    async function logoutUser() {
      await apiClient.logoutUser();
      setAppState({ ...appState, user: "", isAuthenticated: false, token: "" });
      navigate("/");
      window.location.reload(true);
    }
    return (
      <div className="nav-links">
        <ul className="links">
          <li
            onClick={() => {
              navigate("/exercise");
            }}
          >
            <Link to="/exercise">Exercise</Link>
          </li>
          <li
            onClick={() => {
              navigate("/sleep");
            }}
          >
            <Link to="/sleep">Sleep</Link>
          </li>
          <li
            onClick={() => {
              navigate("/nutrition");
            }}
          >
            <Link to="/nutrition">Nutrition</Link>
          </li>
          <li
            onClick={() => {
              navigate("/activity");
            }}
          >
            <Link to="/activity">Activity</Link>
          </li>
          <li onClick={logoutUser}>Log Out</li>
        </ul>
      </div>
    );
  }
}

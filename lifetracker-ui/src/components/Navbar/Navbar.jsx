import * as React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setAppState }) {
  const navigate = useNavigate();
  const handleOnLogout = () => {
    setAppState({});
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="content">
        <Link to="/">
          <img
            className="navbar-logo"
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
          />
        </Link>
        <ul className="links">
          <Link to="/activity">
            <li>Activity</li>
          </Link>

          <li>Exercise</li>

          <Link to="/nutrition">
            <li>Nutrition</li>
          </Link>

          <li>Sleep</li>

          {user ? (
            <button className="register-button" onClick={handleOnLogout}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="login-button">Sign In</button>
              </Link>
              <Link to="/auth/register">
                <button className="register-button">Register</button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

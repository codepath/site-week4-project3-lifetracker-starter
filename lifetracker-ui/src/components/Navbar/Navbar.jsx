import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import "./Navbar.css";

export default function Navbar({ setAppState, appState }) {
  console.log(appState);

  function handleSignOut(e) {
    setAppState((prevState) => ({
      ...prevState,
      isAuthenticated: false
    }));
    localStorage.setItem("LifeTracker_Token", null)
  }
  return (
    <Fragment>
      <nav className="navbar">
        <Link to="/">
          <div className="logo-design">P</div>
        </Link>
        <ul className="menu-links">
          <li>
            <Link to="/activity" className="nav-link">
              Activity
            </Link>
          </li>
          <li>
            <Link to="/exercise" className="nav-link">
              Exercise
            </Link>
          </li>
          <li>
            <Link to="/nutrition" className="nav-link">
              Nutrition
            </Link>
          </li>
          <li>
            <Link to="/sleep" className="nav-link">
              Sleep
            </Link>
          </li>
          {appState.isAuthenticated ? (
            <li>
              <Link to="/">
                <button onClick={handleSignOut} id="navbar-button1">
                  Sign Out
                </button>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button id="navbar-button1">Sign in</button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button id="navbar-button2">Register</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </Fragment>
  );
}

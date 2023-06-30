import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import "./Navbar.css";

export default function Navbar({ setAppState, appState }) {
  console.log(appState);

  function handleSignOut(e) {
    setAppState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
    }));
  }
  return (
    <Fragment>
      <nav className="navbar">
        <Link to="/">
          <div className="logo-design">P</div>
        </Link>
        <ul className="menu-links">
          <li>
            <Link to="/activity">
              <a href="" className="nav-link">
                Activity
              </a>
            </Link>
          </li>
          <li>
            <Link to="/exercise">
              <a href="" className="nav-link">
                Exercise
              </a>
            </Link>
          </li>
          <li>
            <Link to="/nutrition">
              <a href="" className="nav-link">
                Nutrition
              </a>
            </Link>
          </li>
          <li>
            <Link to="/sleep">
              <a href="" className="nav-link">
                Sleep
              </a>
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

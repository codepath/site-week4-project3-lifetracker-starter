import * as React from "react";
import "./NavLinks.css";
import { Link } from "react-router-dom";

export default function NavLinks({ loggedIn = true }) {
  return (
    <nav className="nav-links">
      <div className="nl-content">
        <Link to="/activity">
          <p>Activity</p>
        </Link>
        <Link to="/exercise">
          <p>Exercise</p>
        </Link>
        <Link to="/nutrition">
          <p>Nutrition</p>
        </Link>
        <Link to="/sleep">
          <p>Sleep</p>
        </Link>

        {loggedIn ? (
          <button className="logout-button">Logout</button>
        ) : (
          <>
            <Link to="/login">
              <p>Login</p>
            </Link>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

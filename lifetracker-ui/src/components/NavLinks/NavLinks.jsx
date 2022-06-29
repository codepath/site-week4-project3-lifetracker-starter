import * as React from "react";
import "./NavLinks.css";
import { Link } from "react-router-dom";

export default function NavLinks({ loggedIn = false }) {
  return (
    <div className="nav-links">
      <div className="nl-content">
        <Link className="nll" to="/activity">
          <p className="nlp">Activity</p>
        </Link>
        <Link className="nll" to="/exercise">
          <p className="nlp">Exercise</p>
        </Link>
        <Link className="nll" to="/nutrition">
          <p className="nlp">Nutrition</p>
        </Link>
        <Link className="nll" to="/sleep">
          <p className="nlp">Sleep</p>
        </Link>

        {loggedIn ? (
          <button className="logout-button">Logout</button>
        ) : (
          <>
            <Link className="nll" to="/login">
              <p className="nlp">Login</p>
            </Link>
            <Link className="nll" to="/register">
              <button className="signup-button nll">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

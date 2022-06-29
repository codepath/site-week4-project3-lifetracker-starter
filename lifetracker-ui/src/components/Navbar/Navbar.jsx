import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import NavLinks from "components/NavLinks/Navlinks";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nv-content">
        <div className="logo">
          <Link to="/">
            <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" />
          </Link>
        </div>
        <NavLinks />
      </div>
    </nav>
  );
}

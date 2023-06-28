import React from "react";
import logo from "../../assets/codepath.svg";
import { Link } from "react-router-dom";


import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
    <div className="logo-design">P</div>
    </Link>
      <ul className="menu-links">
      <li>
          <a href="" className="nav-link">
            Activity
          </a>
        </li>        
        <li>
          <a href="" className="nav-link">
            Exercise
          </a>
        </li>
        <li>
          <a href="" className="nav-link">
            Nutrition
          </a>
        </li>
        <li>
          <a href="" className="nav-link">
            Sleep
          </a>
        </li>
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
      </ul>
    </nav>
  );
}

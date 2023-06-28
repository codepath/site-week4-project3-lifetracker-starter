import React from "react";
import logo from "../../assets/codepath.svg";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* <div id="logo">
        <img src={logo} alt="image of code path logo" />
      </div> */}
    <div class="logo-design">P</div>

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
          <button id="navbar-button1">Sign in</button>
        </li>
        <li>
          <button id="navbar-button2">Register</button>
        </li>
      </ul>
    </nav>
  );
}

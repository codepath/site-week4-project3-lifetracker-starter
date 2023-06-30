import * as React from "react";
import "./NavLinks.css";
import { Link } from "react-router-dom";

export default function NavLinks() {
  return (
    <div className="nav-links">
      <Link to="/activity">
        <a className="chakra-link navlinks">
          Activity
        </a>
      </Link>

      <Link to="/exercise">
        <a className="chakra-link navlinks" >
          Exercise
        </a>
      </Link>

      <Link to="/nutrition">
        <a className="chakra-link navlinks">
          Nutrition
        </a>
      </Link>

      <Link to="/sleep">
        <a className="chakra-link navlinks">
          Sleep
        </a>
      </Link>
    </div>
  );
}

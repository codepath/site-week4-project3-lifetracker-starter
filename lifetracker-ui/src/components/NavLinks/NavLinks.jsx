import * as React from "react";
import "./NavLinks.css";
import {Link} from "react-router-dom";

export default function NavLinks({loggedIn}) {
  return (
      <div className="nav-links">
        <ul className="nav-list">
          <li>
          <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href="/nutrition">Nutrition</a>
          </li>
          <li>
          <Link to={"/activity"}>Activity</Link>
          </li>
          {loggedIn ? <li>Logout</li> : <><li className="register"><Link to={"/login"}>Login</Link></li><li className="register"><Link to={"/register"}>Sign Up</Link></li></>}
          
        </ul>
      </div>
  )
}
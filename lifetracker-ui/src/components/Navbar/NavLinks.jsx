import * as React from "react"
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function NavLinks(props) {

  return (
    <div className="nav-links">
        <ul>
            <li>Activity</li>
            <li>Nutrition</li>
            <li><Link to="/login"> Login </Link></li>
            <li className={!(props.isLoggedIn) ? "hidden" : ''} onClick={() => props.setIsLoggedIn()}><Link to="/"> Logout </Link></li>
            <li><Link to="/register"> Sign Up </Link></li>
        </ul>
    </div>
  )
}
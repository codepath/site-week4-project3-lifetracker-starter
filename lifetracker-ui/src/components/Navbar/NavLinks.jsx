import * as React from "react"
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function NavLinks() {
  return (
    <div className="nav-links">
        <ul>
            <li>Activity</li>
            <li>Nutrition</li>
            <li>Login</li>
            <li>Sign Up</li>
        </ul>
    </div>
  )
}
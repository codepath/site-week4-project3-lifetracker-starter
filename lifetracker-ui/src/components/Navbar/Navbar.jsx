import * as React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
       
        <Link to="/">
        <img className="navbar-logo" src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"/>
        </Link>
        <ul className="links">
           
          <li >Activity</li>
          
          
          <li>Exercise</li>
        
          <li>Nutrition</li>
      
          <li>Sleep</li>

            <Link to="/auth/login">
          <button className="login-button">Sign In</button>
            </Link>
            <Link to="/auth/register">
          <button className="register-button">Register</button>
            </Link>
        
        </ul>
      </div>
    </nav>
  )
}

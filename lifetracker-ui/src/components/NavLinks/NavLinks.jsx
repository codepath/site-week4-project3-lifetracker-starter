import { useAuthContext } from "../../contexts/auth"
import * as React from "react"
import { Link } from "react-router-dom"
import "./NavLinks.css"

export default function NavLinks() {
  const {user, handleLogout} = useAuthContext()
    return (
      <nav className="nav-links">
        <ul>
          <li><Link to="/activity" label="Activity">Activity</Link></li>
          <li><Link to="/nutrition" label="Nutrition">Nutrition</Link></li>
          {user.email ? 
          (<li onClick={handleLogout}><Link to="/" className="nav-btn">Logout</Link></li>) : 
          (
            <>
            <li><Link to="/login" label="Login">Login</Link></li>
            <li ><Link to="/register" label="Sign Up" className="nav-btn">Sign Up</Link></li>
            </>
        )}      
        </ul>
      </nav>
    )
  }
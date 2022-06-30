import * as React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  )
}

export function Logo() {
  return (
    <div className="logo">
    <Link to="/">
      <img src="https://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="CodePath Logo" />
    </Link>
  </div>
  )
}

export function NavLinks() {
  return (
    <div className="nav-links">
      <Link to="/activity">Activity</Link>
      <span>Exercise</span>
      <Link to="/nutrition">Nutrition</Link>
      <span>Sleep</span>
      {/* <span className="logout-button" onClick={logoutUser}>Logout</span> */}
      <Link to="/register">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
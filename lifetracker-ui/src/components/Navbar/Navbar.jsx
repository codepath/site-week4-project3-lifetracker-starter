import * as React from "react"
import { Link } from 'react-router-dom';
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import "./Navbar.css"

export default function Navbar(props) {
  return (
    <nav className="navbar">
        <div className="logo">
            <Link to="/"> <Logo /> </Link>
        </div>
        <NavLinks isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
    </nav>
  )
}
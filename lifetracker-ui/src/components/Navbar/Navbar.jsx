import * as React from "react"
import {Link} from "react-router-dom"
import NavLinks from "../Navbar/NavLinks"
import "../Navbar/Navbar.css"
import Logo from "../Navbar/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  )
}

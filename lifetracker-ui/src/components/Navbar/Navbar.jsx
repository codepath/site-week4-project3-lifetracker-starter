import * as React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import Logo from "components/Logo/Logo"
import NavLinks from "components/NavLinks/NavLinks"

export default function Navbar() {
    return (
      <nav className="navbar">
        <Logo/>
        <NavLinks/>
      </nav>
    )
  }
import * as React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";
import NavLinks from "components/NavLinks/NavLinks";

export default function Navbar({loggedIn}) {
  return (
    <nav className="navbar">
      <Logo/>
      <NavLinks loggedIn={loggedIn}/>
    </nav>
  )
}
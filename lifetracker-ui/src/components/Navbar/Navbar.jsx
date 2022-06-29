import * as React from "react"
import { Link } from "react-router-dom"
import NavLinks from "components/NavLinks/NavLinks"
import logo from "../../assets/codepathlogo.svg"
import "./Navbar.css"

export default function Navbar(props) {
    return (
      <nav className="Navbar">
        <div className="content">
            <Logo />
            <NavLinks isLogged={props.isLogged} handleOnLog={props.handleOnLog}/>
        </div>
      </nav>
    )
  }

  export function Logo() {
    return (
      <div className="logo">
        <Link to="/"><img src={logo} alt="Codepath Logo"></img></Link>
      </div>
    )
  }

  
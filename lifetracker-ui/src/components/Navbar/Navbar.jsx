import * as React from "react"
import {Link} from "react-router-dom"
import NavLinks from "../Navbar/NavLinks"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  )
}

export function Logo()
{
    return(
        <div>
            <Link to='/'><img src="" className="logo"/></Link>
        </div>
    )
}
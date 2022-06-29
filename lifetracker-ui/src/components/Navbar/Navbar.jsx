import "./Navbar.css"
import * as React from "react"
import NavLinks from "../NavLinks/NavLinks"
import { Link } from "react-router-dom"



export default function Navbar( { isLoggedIn } ) {
  

  return (
    <>
    <div className="navbar">
        <div className="content">
            <Link to="/">
                <div className="logo">
                    <img id="home-logo" src="https://www.pngplay.com/wp-content/uploads/9/Life-PNG-Free-File-Download.png" alt="Home Logo" />
                </div>
            </Link>
            <NavLinks isLoggedIn={isLoggedIn} />
        </div>
    </div>
    </>
  );
}
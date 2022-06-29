import "./NavLinks.css"
import * as React from "react"
import { Link } from "react-router-dom"



export default function NavLinks( { isLoggedIn } ) {
  return (
    <div className="nav-links">
        <Link to="/activity">
          <button>Activity</button>
        </Link>
        <Link to="/exercise">
          <button>Exercise</button>
        </Link>
        <Link to="/nutrition">
          <button>Nutrition</button>
        </Link>
        <Link to="/sleep">
          <button>Sleep</button>
        </Link>
        {
          isLoggedIn ? 
          <>
            <Link to="/">
              <button>Log Out</button>
            </Link>
          </>
          :
          <>
            <Link to="/login">
              <button>Log In</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        }
    </div>
  )
}
import * as React from "react"
import {Link} from "react-router-dom"

export default function NavLinks() {
  return (
    <ul className="nav-links">
        <li className="nav-item"><Link to="/activity" className="nav-item-link"><p>Activity</p></Link></li>
        <li className="nav-item"><Link to="/exercise" className="nav-item-link"><p>Exercise</p></Link></li>
        <li className="nav-item"><Link to="/nutrition" className="nav-item-link"><p>Nutrition</p></Link></li>
        <li className="nav-item"><Link to="/sleep" className="nav-item-link"><p>Sleep</p></Link></li>

        <li className="nav-item"><Link to="/login" className="nav-item-link"><button id="nav-button">Login</button></Link></li>
        <li className="nav-item"><Link to="/register" className="nav-item-link"><button id="nav-button">Sign Up</button></Link></li>
        {/* <button className="logout-button">Log Out</button> */}
    </ul>
  )
}
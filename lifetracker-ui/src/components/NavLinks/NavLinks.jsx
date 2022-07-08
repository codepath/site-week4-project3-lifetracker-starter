import * as React from "react"
import { Link } from "react-router-dom"

export default function NavLinks(props) {
    return (
     <ul className="links">
        <li><Link to="/activity">Activity</Link></li>
        <li><Link to="/nutrition">Nutrition</Link></li>
        <li>{ props.isLogged ? <Link to="/"><button className="logout-button" onClick={props.handleOnLog}>Logout</button></Link> : <Link to="/login">Login</Link>}</li>
        {props.isLogged ?
        null
        :
        <li className="btn"><Link to="/register">Sign Up</Link></li>
        }
     </ul>
    )
  }
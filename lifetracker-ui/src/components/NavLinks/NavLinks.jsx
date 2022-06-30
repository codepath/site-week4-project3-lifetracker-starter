import * as React from "react"
import { Link } from "react-router-dom"
import "./NavLinks.css"

export default function NavLinks(props) {

    const logoutUser = async (event) => {
        event.preventDefault()
        props.setIsLoggedIn(false)
    }

    return (
        <div className="nav-links">
            <ul>
                <li><Link to="/activity">Activity</Link></li>
                <li><Link to="/exercise">Exercise</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/sleep">Sleep</Link></li>
                
                {props.isLoggedIn? <li><button className="logout-button" onClick={logoutUser}><Link to="/">Log Out</Link></button></li> :
                    <div className="login-links">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </div>
                }
            </ul>
        </div>
    )
} 
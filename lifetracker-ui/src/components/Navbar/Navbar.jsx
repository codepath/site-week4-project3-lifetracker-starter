import * as React from "react"
import "./Navbar.css"
import { Link } from 'react-router-dom'
import Register from '../RegistrationForm/RegistrationForm'

export default function Navbar() {
    return (
        <nav className="topnavbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/activity">Activity</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/sleep">Sleep</Link></li>
                <div className="navbtn">
                    <button className="button" >Sign in</button>
                    <Link to="/register">
                        <button className="button1" > Register </button>
                    </Link>
                </div>

            </ul>
        </nav>
    )
}
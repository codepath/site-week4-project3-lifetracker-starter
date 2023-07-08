import * as React from "react"
import "./Navbar.css"
import { Link } from 'react-router-dom'
import Register from '../RegistrationForm/RegistrationForm'

export default function Navbar({appState, setAppState}) {
    function handleSubmit(e){
        e.preventDefault()
        setAppState((prev)=>({
            ...prev, isAuthenticated:false
        }))
        localStorage.setItem("life_token",null)
    }
    return (
        <nav className="topnavbar">
            <ul>
                <li className="homebutt"><Link to="/">V</Link></li>
                <li><Link to="/activity">Activity</Link></li>
                <li><Link to="/exercise">Exercise</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/sleep">Sleep</Link></li>
                <div className="navbtn">
                    {appState.isAuthenticated? ( <button onClick = {handleSubmit}className="button" >Sign out</button>):(
                    <>
                    <Link to="/signin">
                        <button className="button" >Sign in</button>
                    </Link>

                    <Link to="/register">
                        <button className="button1" > Register </button>
                    
                    </Link></>)}
                </div>

            </ul>
        </nav>
    )
}
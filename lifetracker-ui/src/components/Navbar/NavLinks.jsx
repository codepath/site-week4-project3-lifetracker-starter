import * as React from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import "./Navbar.css"

export default function NavLinks(props) {

  const navigate = useNavigate()

  const handleOnClick = (event) => {

    props.setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <div className="nav-links">
        <ul>
            <li>Activity</li>
            <li>Nutrition</li>
            <li className={(props.isLoggedIn) ? "hidden" : ''}><Link to="/login"> Login </Link></li>
            <li className={!(props.isLoggedIn) ? "hidden" : ''} onClick={handleOnClick}><Link to="/"> Logout </Link></li>
            <li className={(props.isLoggedIn) ? "hidden" : ''}><Link to="/register"> Sign Up </Link></li>
        </ul>
    </div>
  )
}
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import apiClient from "../../../services/apiClient"
import logo from "../../assets/codepath.svg"
import "./Navbar.css"



export default function Navbar({user,setAppState}) {
  const [isAuthenticated, setIsAuthenticated] = useState(user?.email)
  

  
  console.log(isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()
  const handleOnLogout = () => {
    setAppState({})
    localStorage.removeItem(apiClient.tokenName);
  //   setLoggedIn(false);
    navigate("/")
  }

 
  const button = isAuthenticated ? (
    <ul>
       <li>
      <Link to="/">
        <img src = {logo} alt = "codepath logo"/>
      </Link>
    </li>
      <li>
      <Link to="/activity">
        <button className="btn ghost">Activity</button>
      </Link>
    </li>
    <li>
      <Link to="/exercise">
        <button className="btn ghost">Exercise</button>
      </Link>
    </li>
    <li>
      <Link to="/nutrition">
        <button className="btn ghost">Nutrition</button>
      </Link>
    </li>
    <li>
      <Link to="/Sleep">
        <button className="btn ghost">Sleep</button>
      </Link>
    </li>
      <li>
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
    </li>
    </ul>
  ) : (
    <ul>
      <li>
      <Link to="/">
        <img src = {logo} alt = "codepath logo"/>
      </Link>
    </li>
       <li>
      <Link to="/activity">
        <button className="btn ghost">Activity</button>
      </Link>
    </li>
    <li>
      <Link to="/exercise">
        <button className="btn ghost">Exercise</button>
      </Link>
    </li>
    <li>
      <Link to="/nutrition">
        <button className="btn ghost">Nutrition</button>
      </Link>
    </li>
    <li>
      <Link to="/sleep">
        <button className="btn ghost">Sleep</button>
      </Link>
    </li>
      <li>
      <Link to="/login">
        <button className="btn ghost">Login</button>
      </Link>
    </li>
    <li>
      <Link to="/register">
        <button className="btn primary">Register</button>
      </Link>
    </li>
  </ul>
  )
  return (
    <nav className="Navbar">
      {button}
    </nav>
  )
}

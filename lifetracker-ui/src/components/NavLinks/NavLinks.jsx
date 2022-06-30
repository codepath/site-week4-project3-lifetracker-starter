import * as React from "react";
import "./NavLinks.css";
import {Link, useNavigate} from "react-router-dom";
import apiClient from "../../services/apiClient";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";

export default function NavLinks({loggedIn}) {
  const {setUser, setError, } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser({});
    setError(null);
    navigate("/")
  }

  return (
      <div className="nav-links">
        <ul className="nav-list">
          <li>
          <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href="/nutrition">Nutrition</a>
          </li>
          <li>
          <Link to={"/activity"}>Activity</Link>
          </li>
          {loggedIn ? <li><button className="logout" onClick={handleLogout}>Logout</button></li> : <><li className="register"><Link to={"/login"}>Login</Link></li><li className="register"><Link to={"/register"}>Sign Up</Link></li></>}
          
        </ul>
      </div>
  )
}
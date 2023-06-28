import Navbar from "../Navbar/Navbar";
import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


 
export default function Login(){
    return(
        <Fragment>
            <Navbar/>
            <div style={{marginTop:"5%"}} className="register">
            <span id="register-icon"><FontAwesomeIcon icon={faUser}/></span>
            <h1 style={{color:"var(--stark)", fontSize:"280%"}}>Welcome</h1>
            <form id="register-form"> 
                <input className="register-input" type="email" autoComplete="on" placeholder="Email" /><br />
                <div className="register-button">
                <input className="button-input" type="password" autoComplete="on" placeholder="Password"/> 
                <button>Show</button>
                </div>
                <button id="register-signup">Login</button>
            </form>
            <p style={{color:"var(--stark)", fontSize:"x-large"}}>New to Us?  &nbsp;
            <Link to="/register" style={{color:"var(--fushia)"}}href="">Sign Up</Link></p>
            </div>
        </Fragment>
    )
}
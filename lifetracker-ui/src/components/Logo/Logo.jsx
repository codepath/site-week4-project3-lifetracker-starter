import * as React from "react"
import {Link} from "react-router-dom";
import logo from '../../assets/life_tracker_logo.png';
import "./Logo.css"

export default function Logo() {
    return (<div className="logo">
        <Link to={"/"}>
            <img src={logo} alt="" className="logo-img"/>
        </Link>
    </div>);
}
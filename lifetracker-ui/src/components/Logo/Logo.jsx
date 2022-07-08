import * as React from "react"
import { Link } from "react-router-dom"
import "./Logo.css"

export default function Logo(props) {
  return (<div className="logo">
    <Link to={`/`}>
      <img src="https://i.pinimg.com/originals/f4/c9/a8/f4c9a88e93317977c3d0921b12309578.png" alt="smart watch logo">
      </img>
    </Link>
  </div>)
}
import * as React from "react"
import {Link} from "react-router-dom"

export default function NavLinks() {
  return (
    <div className="nav-links">
        <Link to="/activity">Activity</Link>
        <Link to="/nutrition">Nutrition</Link>
    </div>
  )
}
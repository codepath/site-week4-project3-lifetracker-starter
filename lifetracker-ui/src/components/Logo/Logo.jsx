import * as React from "react"
import "./Logo.css"
import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <div className="Logo">
      <Link to = "/">
      <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wfsonfv0p92plryzwijf" alt="codepath large" />
      </Link>
    </div>
  )
}
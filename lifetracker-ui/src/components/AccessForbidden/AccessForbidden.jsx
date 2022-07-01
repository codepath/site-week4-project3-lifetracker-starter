import * as React from "react"
import { Link } from "react-router-dom"
import "./AccessForbidden.css"

export default function AccessForbidden(props) {
    return (
      <div className="access-forbidden">
        <h1>Access Forbidden. Please login to view this page.</h1>
        <Link to="/login"><button>Login</button></Link>
      </div>
    )
  }
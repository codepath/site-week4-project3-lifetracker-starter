import { Link, useNavigate } from "react-router-dom"
import moment from "moment"

import "./Portal.css"
import ActivityPage from "../ActivityPage/ActivityPage"

export default function Portal({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }
  const title = isAuthenticated ? "Below are your activities" : "Please login to see the portal"

  const content = isAuthenticated ? (
    <ActivityPage user={user}/>
  ) : (
    <p className="appt">Thank you!</p>
  )

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  )

  return (
    <div className="Portal">
      <div className="content">
        {isAuthenticated ? <h1>Welcome, {user.firstName}!</h1> : null}

        <div className="card">
          <div className="header">
            <div className={`title ${isAuthenticated ? "green" : ""}`}>{title}</div>
          </div>
          <div className="content">{content}</div>
          <div className="footer">{button}</div>
        </div>
      </div>
    </div>
  )
}
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
    <>
    <h2>Activity Feed</h2>

      <div className="activity-container">
        <div>
          <p>Total Exercise Minutes</p>
        </div>
        <div>
          <p>Average Hours of Sleep</p>
        </div>
        <div>
          <p>Average Daily Calories</p>
        </div>
        <div>
          <p>More Stats</p>
        </div>
      </div>
      </>
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
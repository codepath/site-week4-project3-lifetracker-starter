import * as React from "react"
import { Link, useNavigate } from "react-router-dom"


export default function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email);
  const title = isAuthenticated
    ? "Below are your activities"
    : "Please login";
  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  };

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
    <p className="appt">{title}</p>
  );

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  );

  return (
    <>
      

    <div>{content}</div>
    {button}
      
    
    </>
  );
}

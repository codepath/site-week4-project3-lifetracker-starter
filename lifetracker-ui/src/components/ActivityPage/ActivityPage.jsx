import "./ActivityPage.css"
import ActivityFeed from "../ActivityFeed/ActivityFeed"
import { useState } from "react"



import { Link, useNavigate } from "react-router-dom"


export default function ActivityPage({ user, setAppState, isAuthenticated }) {
  const navigate = useNavigate()
 

  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }

  const title = isAuthenticated ? "" : "Please log in to view activity."
  console.log("portal")
  console.log(isAuthenticated)

  const content = isAuthenticated ? (
    <>
     
      <div className="activity-page">
            <div className="content">
                <div className="actions">
                   <ActivityFeed user = {user}/>   
    
                </div>
            </div>
        </div>
    </>
  ) : (
    <p className="appt">Please log in to view activity</p>
  )


  return (
    <div className="Portal">
      <div className="content">
        {isAuthenticated ? <h1 className="title"> Activity Feed </h1> : null}

        <div className="card">
          <div className="header">
            <div className={`title ${isAuthenticated ? "" : ""}`}>{title}</div>
          </div>
          <div className="content">{content}</div>
         
        </div>
      </div>

      <div className="media">
       
      </div>
    </div>
  )
}



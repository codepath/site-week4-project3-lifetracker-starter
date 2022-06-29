import * as React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./ActivityPage.css"

export default function ActivityPage(props) {

  const navigate = useNavigate()

  console.log(props.isLoggedIn)

  return (
  <div className="activity-page">
    {props.isLoggedIn ? <p> I'm the Portal (ActivityPage) </p> : useEffect(() => {
     navigate("/access-denied")   
},[])}
  </div>

  )
}

// {props.isLoggedIn ?     <div className="activity-page">
// <p> I'm the Portal </p>
// </div>: navigate("/access-denied")}
// {if(props.isLoggedIn) {
//   navigate("/access-denied")
// }}
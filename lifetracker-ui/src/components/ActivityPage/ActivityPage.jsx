import * as React from "react"
import ActivityFeed from "../ActivityPage/ActivityFeed"

export default function ActivityPage(props) {
  if(props.userLoggedIn)
  {
    return (
    <div className="activity-page">
        <ActivityFeed totalCaloriesPerDay = {props.totalCaloriesPerDay}
                      avgCaloriesPerCategory = {props.avgCaloriesPerCategory}/>
    </div>
  )}
  else{
    return(
      <h1>ACCESS FORBIDDEN</h1>
    )
  }
}
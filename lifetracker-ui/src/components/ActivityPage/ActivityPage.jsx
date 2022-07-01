import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "../ActivityFeed/ActivityFeed"

export default function ActivityPage(props) {
    return (
        <div className="activity-page">
            <div className="content">
               <ActivityFeed totalCaloriesPerDay={props.totalCaloriesPerDay} avgCaloriesPerCategory={props.avgCaloriesPerCategory}/>
            </div>
        </div>
    )
  }

  
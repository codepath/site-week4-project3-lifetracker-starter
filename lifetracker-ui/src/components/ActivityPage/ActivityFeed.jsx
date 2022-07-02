import * as React from "react"
import "../ActivityPage/ActivityPage.css"

export default function ActivityFeed(props) {
  return(
    <div className="activity-feed">
        <h1>Activity Feed</h1>
        <div className = "per-category">
            <div className="category" id="exercise">
                <h4 id="title">Total Exercise Minutes</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="sleep">
                <h4 id="title">Avg Sleep Hours</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="calories">
                <h4 id="title">Avg Daily Calories</h4>
                <p id="stats">0</p>
            </div>
        </div>
        <h1>More Stats</h1>
        <div className="per-category">
            <div className="category" id="max-calories">
                <h4 id="title">Maximum Hourly Calories</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="avg-exercise">
                <h4 id="title">Avg Exercise Intensity</h4>
                <p id="stats">0</p>
            </div>
            <div className="category" id="max-sleep">
                <h4 id="title">Total Hours Slept</h4>
                <p id="stats">0</p>
            </div>
        </div>
        <br></br>
    </div>
  )
}
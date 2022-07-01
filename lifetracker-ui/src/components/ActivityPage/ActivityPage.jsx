import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import * as React from "react"
import "./ActivityPage.css"

export default function ActivityPage(props) {
    return (
        <div className="activity-page">
            <h1>Activity Page</h1>
            <ActivityFeed/>
        </div>
    )}
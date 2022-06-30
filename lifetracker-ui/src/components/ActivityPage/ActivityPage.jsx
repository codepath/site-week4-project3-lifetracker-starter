import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import * as React from "react"

export default function ActivityPage(props) {

    return (
        <div className="activity-page">
            {props.isLoggedIn? <ActivityFeed /> : <AccessForbidden />}
        </div>
    )
}
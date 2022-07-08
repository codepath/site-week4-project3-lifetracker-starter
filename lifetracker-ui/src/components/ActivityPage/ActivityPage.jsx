import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { useActivityContext } from "../../contexts/activity"
import * as React from "react"
import "./ActivityPage.css"
import Loading from "components/Loading/Loading"

export default function ActivityPage() {
    const {activity, isLoading} = useActivityContext()
    
    return (
        <div className="activity-page">
            {isLoading? <Loading/>: <ActivityFeed totalCaloriesPerDay={activity.nutrition?.calories.perDay} avgCaloriesPerCategory={activity.nutrition?.calories.perCategory}
            aggData={activity.nutrition?.aggData}/>}
        </div>
    )}
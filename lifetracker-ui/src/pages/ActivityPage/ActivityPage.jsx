import "./ActivityPage.css"
import { useState } from "react"
import Loading from "../../components/Loading/Loading"
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed"

export default function ActivityPage({setAppState, appState}) {
    const [ isProcessing, setIsProcessing ] = useState(false)
    if (isProcessing) {
        return (
            <Loading/>
        )
    }
    else {
        return (
            <div className="activity-page">
                <h3>Activity Feed</h3>
                <ActivityFeed/>
            </div>
        )
    }
    
}
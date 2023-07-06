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
    if (appState.user){
        return (
            <div className="activity-page">
                <h3>Activity Feed</h3>
                <ActivityFeed/>
            </div>
        )
    }
    else {
        return (
            <div className="activity-page">
                <h3>Please Log in/Sign Up to get Authorization for this Page</h3>
            </div>
        )
    }
    
}
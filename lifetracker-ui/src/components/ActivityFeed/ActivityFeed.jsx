import * as React from "react"
import { Link } from "react-router-dom" 

export default function ActivityFeed(props) {
    return (
        <div className="activity-feed">
            <div className="actions">
                <h2 className="heading">Activity Feed</h2>
                <div className="buttons">
                    <Link to="/nutrition/create"><button className="Button outline small outline aqua">Record Nutrition</button></Link>
                </div>
            </div>
            <div className="stats">
                <div className="main">
                    <div className="per-category">
                        <h4>Average Calories Per Category</h4>
                    
                    </div>
                    <div className="per-day">
                        <h4>Total Calories Per Day</h4>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  
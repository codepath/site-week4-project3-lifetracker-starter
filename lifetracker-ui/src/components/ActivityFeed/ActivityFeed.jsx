import SummaryStat from "components/SummaryStat/SummaryStat"
import * as React from "react"
import "./ActivityFeed.css"

export default function ActivityFeed({totalCaloriesPerDay, avgCaloriesPerCategory, aggData}) {
    console.log(totalCaloriesPerDay, avgCaloriesPerCategory, aggData)
    if(!aggData.sumCalories){
        aggData.sumCalories = 0
        aggData.maxCalories = 0
        aggData.avgCalories = 0
    }

    console.log(aggData)
    return (
        <div className="activity-feed">
            <h1>Activities</h1>
            <div className="agg-stats">
                <SummaryStat stat={aggData.sumCalories} label="Total Calories" />
                <SummaryStat stat={aggData.maxCalories} label="Max Daily calories"/>
                <SummaryStat stat={aggData.avgCalories} label="Avg Daily calories"/>
            </div>
            <div className="per-category">
                <h4>Average Calories Per Category</h4>
                <div className="stat-grid">
                    {avgCaloriesPerCategory.map((item)=>{return <SummaryStat stat={item.avgCaloriesPerCategory} label="Calories" substat={item.category}/>})}
                </div> 
           </div>
            <div className="per-day">
                <h4>Total Calories Per Day</h4>
                <div className="stat-grid">
                {totalCaloriesPerDay.map((item)=>{return <SummaryStat stat={item.totalCaloriesPerDay} label="Calories" substat={item.date}/>})}
                </div>
            </div>
        </div>
    )}
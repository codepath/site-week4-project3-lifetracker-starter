import SummaryStat from "components/SummaryStat/SummaryStat"
import * as React from "react"
import "./ActivityFeed.css"

export default function ActivityFeed({totalCaloriesPerDay, avgCaloriesPerCategory, aggData}) {
    console.log(totalCaloriesPerDay, avgCaloriesPerCategory, aggData)
    // totalCaloriesPerDay = [
    //     {
    //         "date": "07/01/2022",
    //         "totalCaloriesPerDay": "414"
    //     },
    //     {
    //         "date": "07/06/2022",
    //         "totalCaloriesPerDay": "1"
    //     },
    //     {
    //         "date": "07/07/2022",
    //         "totalCaloriesPerDay": "1"
    //     }
    // ]
    // avgCaloriesPerCategory = [
    //     {
    //         "category": "fruit",
    //         "avgCaloriesPerCategory": "12.0"
    //     },
    //     {
    //         "category": "juice",
    //         "avgCaloriesPerCategory": "100.0"
    //     },
    //     {
    //         "category": "new",
    //         "avgCaloriesPerCategory": "1.0"
    //     },
    //     {
    //         "category": "orange",
    //         "avgCaloriesPerCategory": "200.0"
    //     },
    //     {
    //         "category": "veggie",
    //         "avgCaloriesPerCategory": "25.8"
    //     }
    // ]

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
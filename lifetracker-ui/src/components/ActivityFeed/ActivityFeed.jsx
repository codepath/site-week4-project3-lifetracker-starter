import React from "react";
import SummaryStat from "../SummaryStat/SummaryStat";

export default function ActivityFeed({
    totalCaloriesPerDay,
    avgCaloriesPerCategory = [
        {
            calories: 673,
            category: "Total Exercise Minutes",
        },
        {
            calories: 386,
            category: "Avg Sleep Hours",
        },
        {
            calories: 638,
            category: "Avg Daily Calories",
        },
        {
            calories: 883,
            category: "Maximum Hourly Calories",
        },
        {
            calories: 366,
            category: "Avg Exercise Intensity",
        },
        {
            calories: 333,
            category: "Total Hours Slept",
        },
    ],
}) {
    let loopTime =
        avgCaloriesPerCategory.length > 6 ? 6 : avgCaloriesPerCategory.length;

    let placeholder = [];
    for (let i = 0; i < loopTime; i++) {
        placeholder.push(avgCaloriesPerCategory[i]);
    }

    return (
        <div className="activity-feed">
            <div className="per-category">
                <h4>Average Calories Per Category</h4>
                {/* {placeholder.map((e, idx) => (
                    <SummaryStat 
                    stat={e.calories.toFixed(1)}
                    key={idx}
                    label={e.calories}
                    substat="category"
                    >
                        e
                    </SummaryStat>
                ))} */}
            </div>
            <div className="per-day"><h4></h4></div>
            ActivityFeed
        </div>
    );
}

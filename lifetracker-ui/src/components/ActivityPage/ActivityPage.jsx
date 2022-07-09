import "./ActivityPage.css";
import Loading from "../Loading/Loading";
import ActivityNew from "../ActivityPage/ActivityNew";
import { useState } from "react";

export default function ActivityPage() {
  const [newActivity, setNewActivity] = useState(false);
  const handleNewActivityOnClick = () => {
    setNewActivity(true);
  };

  return (
    <div className="activity-page">
      <div className="banner">
        <h1>Activity Page</h1>
      </div>
      <div className="content">
        <ActivityFeed />
      </div>
    </div>
  );
}

export function ActivityFeed({ totalCaloriesPerDay, avgCaloriesPerCategory }) {
  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
      </div>
      <div className="per-day">
        <h4>Average Calories Per Day</h4>
      </div>
    </div>
  );
}

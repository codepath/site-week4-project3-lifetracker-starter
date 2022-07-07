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
        {newActivity ? (
          <ActivityNew setNewActivity={setNewActivity} />
        ) : (
          <>
            <ActivityOverview handleOnClick={handleNewActivityOnClick} />
            <ActivityFeed />
          </>
        )}
      </div>
    </div>
  );
}

export function ActivityOverview({ handleOnClick }) {
  return (
    <div className="activity-overview">
      <div className="header">
        <h3>Overview</h3>
      </div>
    </div>
  );
}

export function ActivityFeed({ activities }) {
  return (
    <div className="activity-feed">
      {activities ? (
        activities.map(<ActivityCard />)
      ) : (
        <h1 className="empty-message">Nothing here yet</h1>
      )}
    </div>
  );
}

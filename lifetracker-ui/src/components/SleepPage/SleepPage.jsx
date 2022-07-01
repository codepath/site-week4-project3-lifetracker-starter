import "./SleepPage.css";
import Loading from "../Loading/Loading";
import SleepNew from "../SleepPage/SleepNew";
import { useState } from "react";

export default function SleepPage() {
  const [newSleep, setNewSleep] = useState(false);
  const handleNewSleepOnClick = () => {
    setNewSleep(true);
    console.log("clicked");
  };
  return (
    <div className="sleep-page">
      <div className="banner">
        <h1>Sleep Page</h1>
      </div>
      <div className="content">
        {newSleep ? (
          <SleepNew setNewSleep={setNewSleep} />
        ) : (
          <>
            <SleepOverview handleOnClick={handleNewSleepOnClick} />
            <SleepFeed />
          </>
        )}
      </div>
    </div>
  );
}

export function SleepOverview({ handleOnClick }) {
  return (
    <div className="sleep-overview">
      <div className="header">
        <h3>Overview</h3>
        <button onClick={handleOnClick}>Record Sleep</button>
      </div>
    </div>
  );
}

export function SleepFeed({ activities }) {
  return (
    <div className="sleep-feed">
      {activities ? (
        activities.map(<SleepCard />)
      ) : (
        <h1 className="empty-message">Nothing here yet</h1>
      )}
    </div>
  );
}

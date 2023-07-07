import "./ActivityPage.css";
import { useState } from "react";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";
import { useNavigate } from "react-router-dom";

export default function ActivityPage({ setAppState, appState }) {
  const navigate = useNavigate();
  if (appState.user) {
    return (
      <div className="activity-page">
        <h1>Activity Feed</h1>
        <div className="redirects">
          <div
            className="record-nutrition"
            onClick={() => navigate("/nutrition/create")}
          >
            <span>Record Nutrition</span>
          </div>
        </div>
        <ActivityFeed setAppState={setAppState} appState={appState}/>
      </div>
    );
  } else {
    return (
      <div className="activity-page">
        <h1>Please Log in/Sign Up to get Authorization for this Page</h1>
      </div>
    );
  }
}

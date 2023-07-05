import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./ActivityPage.css";

export default function ActivityPage({ appState }) {
  return (
    <>
      {appState.isAuthenticated ? (
        <Fragment>
          <div className="activityPage">
            <div className="activity-header">
              <p>Activity Feed</p>
              <div className="activity-buttons">
                <Link to="/exercise">
                  {" "}
                  <button
                    style={{ border: "solid 2px var(--fushia)" }}
                    className="activity-button"
                  >
                    Add Exercise
                  </button>
                </Link>
                <Link to="/sleep">
                  {" "}
                  <button
                    style={{ border: "solid 2px var(--jewel)" }}
                    className="activity-button"
                  >
                    Log Sleep
                  </button>
                </Link>
                <Link to="/nutrition">
                  {" "}
                  <button
                    style={{ border: "solid 2px var(--stark)" }}
                    className="activity-button"
                  >
                    Record Nutrition
                  </button>
                </Link>
              </div>
            </div>
            <div className="exercise-info">
              <div
                style={{ border: "solid 4px var(--fushia)" }}
                className="actExerMin"
              >
                <p style={{ marginBottom: "18%" }}>Total Exercise Minutes</p>
                <span style={{ marginRight: "50%" }}>(Min Place)</span>
                <span>(Percent Place)</span>
              </div>
              <div
                style={{ border: "solid 4px var(--jewel)" }}
                className="actExerMin"
              >
                <p style={{ marginBottom: "20%" }}>Average Hours of Sleep</p>
                <span style={{ marginRight: "50%" }}>(Sleep Place)</span>
                <span>(Percent Place)</span>
              </div>
              <div
                style={{ border: "solid 4px var(--stark)" }}
                className="actExerMin"
              >
                <p style={{ marginBottom: "20%" }}>Average Daily Calories</p>
                <span style={{ marginRight: "50%" }}>(Cal Place)</span>
                <span>(Percent Place)</span>
              </div>
              <div className="actExerMin" id="more-stats">
                <p>More Stats</p>
                <div id="stats">
                  <div className="stats-info">
                    <p>Max Calories In One Meal</p>
                    <span>(Cal Place)</span>
                  </div>
                  <div className="stats-info">
                    <p>Average Exercise Intensity</p>
                    <span>(Inten Place)</span>
                  </div>{" "}
                  <div className="stats-info">
                    <p>Total Number of Hours Slept</p>
                    <span>(Hour Place)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

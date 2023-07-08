import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

import "./ActivityPage.css";

export default function ActivityPage({ appState, setAppState }) {
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.stats({
          id: appState.user.id,
        });
        setAppState((prevState) => ({
          ...prevState,
          averageDailyCalories: Number(data.averageDailyCalories),
          averageExerciseInt: Number(data.averageExerciseInt),
          avgSleepHours: Number(data.avgSleepHours),
          maxCalsInOneMeal: Number(data.maxCalsInOneMeal),
          sumExerciseMins: Number(data.sumExerciseMins),
          totalNumSleep: Number(data.totalNumSleep)
        }));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [appState.exercise, appState.nutrition, appState.sleep]);

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
                <p style={{ marginBottom: "8%" }}>Total Exercise Minutes</p>
                <span className="apStats" >
                  {appState.sumExerciseMins.toFixed(1)}
                </span>
              </div>
              <div
                style={{ border: "solid 4px var(--jewel)" }}
                className="actExerMin"
              >
                <p style={{ marginBottom: "8%" }}>Average Hours of Sleep</p>
                <span className="apStats" >
                  {appState.avgSleepHours.toFixed(1)}
                </span>
              </div>
              <div
                style={{ border: "solid 4px var(--stark)" }}
                className="actExerMin"
              >
                <p style={{ marginBottom: "8%" }}>Average Daily Calories</p>
                <span className="apStats" >
                  {appState.averageDailyCalories.toFixed(1)}
                </span>
              </div>
              <div className="actExerMin" id="more-stats">
                <p>More Stats</p>
                <div id="stats">
                  <div className="stats-info">
                    <p>Max Calories In One Meal</p>
                    <span>{appState.maxCalsInOneMeal.toFixed(1)}</span>
                  </div>
                  <div className="stats-info">
                    <p>Average Exercise Intensity</p>
                    <span>{appState.averageExerciseInt.toFixed(1)}</span>
                  </div>{" "}
                  <div className="stats-info">
                    <p>Total Number of Hours Slept</p>
                    <span>{appState.totalNumSleep.toFixed(1)}</span>
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

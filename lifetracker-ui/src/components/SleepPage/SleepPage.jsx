import React, { Fragment, useState } from "react";
import emptybed from "../../assets/empty-bed.jpg";
import apiClient from "../../services/apiClient";

import "./SleepPage.css";

export default function SleepPage({ appState, setAppState }) {
  const [sleepForm, setSleepForm] = useState(false);
  const [sleepInfo, setSleepInfo] = useState({
    start_time: "",
    end_time: ""
  });

  async function handleRecord(e) {
    e.preventDefault();
    setSleepForm(!sleepForm);
  }
  console.log(sleepInfo);

  async function handleSubmit(e) {
    e.preventDefault();
    if (sleepInfo.start_time && sleepInfo.end_time) {
      try {
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.sleep({
          start_time: sleepInfo.start_time,
          end_time: sleepInfo.end_time,
          id: appState.user.id
        });
        console.log(data);
        setAppState((prevState) => ({
          ...prevState,
          sleep: [data.sleep, ...prevState.sleep]
        }));
      } catch (err) {
        console.log(err);
      }
      setSleepInfo((prevState) => ({
        start_time: "",
        end_time: ""
      }));
      setSleepForm(!sleepForm);
    }
  }
  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="barPage">
            <div className="bars-header">
              <h1>Sleep</h1>
            </div>
            {sleepForm ? (
              <>
                <div className="bars-form">
                  <div className="barsForm-header">
                    <h1> Record Sleep</h1>
                  </div>
                  <form className="innerForm">
                    <label className="bars-label" htmlFor="start-time" required>
                      Start Time
                    </label>
                    <br />
                    <input
                      className="barsForm-input"
                      value={sleepInfo.start_time}
                      onChange={(e) =>
                        setSleepInfo((prevState) => ({
                          ...prevState,
                          start_time: e.target.value,
                        }))
                      }
                      type="datetime-local"
                      id="start-time"
                      name="start-time"
                      required
                    />
                    <br />
                    <label className="bars-label" htmlFor="end-time" required>
                      End Time
                    </label>
                    <br />
                    <input
                      value={sleepInfo.end_time}
                      onChange={(e) =>
                        setSleepInfo((prevState) => ({
                          ...prevState,
                          end_time: e.target.value,
                        }))
                      }
                      className="barsForm-input"
                      type="datetime-local"
                      id="end-time"
                      name="end-time"
                      required
                    />
                    <br />

                    <button onClick={handleSubmit} className="bars-cancel">
                      Save
                    </button>
                    <button className="bars-cancel" onClick={handleRecord}>
                      Cancel
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="bar-content">
                  {appState.sleep.length === 0 ? (
                    <Fragment>
                      <p className="bar-contentp">Nothing here yet.</p>
                      <button onClick={handleRecord} className="bar-button">
                        Add Sleep
                      </button>
                      <br />
                      <img src={emptybed} alt="an image of an empty bed" />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                        style={{ marginTop: "2%" }}
                        onClick={handleRecord}
                        className="bar-button"
                      >
                        Add Sleep
                      </button>
                      <div id="exercise-whole">
                        {appState.sleep.map((sleep) => {
                          const createdAtUTC = new Date(sleep.start_time);
                          const createdAtUTCend = new Date(sleep.end_time);
                          const createdAtLocal = createdAtUTC.toLocaleString();
                          const createdAtLocalend =
                            createdAtUTCend.toLocaleString();
                          const splitCreatedAtLocal = createdAtLocal.split(" ");
                          const splitCreatedAtLocalend =
                            createdAtLocalend.split(" ");

                          const getOrdinalSuffix = (day) => {
                            if (day >= 11 && day <= 13) {
                              return "th";
                            }

                            switch (day % 10) {
                              case 1:
                                return "st";
                              case 2:
                                return "nd";
                              case 3:
                                return "rd";
                              default:
                                return "th";
                            }
                          };
                          let day;
                          const formatDate = (dateString) => {
                            const date = new Date(dateString);
                            const month = date.toLocaleString("en-US", {
                              month: "short",
                            });
                            day = date.getDate();
                            console.log(date.getDate());
                            const year = date.getFullYear();
                            const suffix = getOrdinalSuffix(day);

                            return `${month} ${day}${suffix} ${year}`;
                          };

                          formatDate(splitCreatedAtLocal[0]);
                          return (
                            //ask about keys and how to make the unique
                            <Fragment>
                              <div
                                style={{ marginTop: "3%" }}
                                className="exercise-tiles"
                              >
                                <div className="bars-image">{day}</div>
                                <p className="bars-name">
                                  {formatDate(splitCreatedAtLocal[0])}
                                </p>
                                <div className="durint-flex">
                                  <div className="dur-flex">
                                    <span className="duration-label">
                                      Start Time
                                    </span>
                                    <p className="bars-duration">
                                      {splitCreatedAtLocal[1]
                                        .replace(/:00/g, "")
                                        .toLowerCase() + splitCreatedAtLocal[2]}
                                    </p>
                                  </div>
                                  <div className="int-flex">
                                    <span className="intensity-label">
                                      End Time
                                    </span>
                                    <p className="bars-intensity">
                                      {splitCreatedAtLocalend[1]
                                        .replace(/:00/g, "")
                                        .toLowerCase() +
                                        splitCreatedAtLocalend[2]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}
                      </div>
                    </Fragment>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

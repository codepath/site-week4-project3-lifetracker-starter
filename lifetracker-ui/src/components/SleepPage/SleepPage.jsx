import React, { Fragment, useState } from "react";
import emptybed from "../../assets/empty-bed.jpg";

import "./SleepPage.css";

export default function SleepPage({ appState }) {
  const [sleepForm, setSleepForm] = useState(false);

  function handleRecord(e) {
    e.preventDefault();
    setSleepForm(!sleepForm);
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
                      className="barsForm-input"
                      type="datetime-local"
                      id="end-time"
                      name="end-time"
                      required
                    />
                    <br />
               
                  <button className="bars-cancel">
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
                  <p>Nothing here yet.</p>
                  <button onClick={handleRecord} className="bar-button">
                    Record Sleep
                  </button>
                  <br />
                  <img src={emptybed} alt="an image of an empty bed" />
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

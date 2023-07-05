import React, { Fragment, useState } from "react";
import bikepath from "../../assets/bikepath.jpg";
import "./ExercisePage.css";
import apiClient from "../../services/apiClient";

export default function ExercisePage({ appState, setAppState }) {
  const [exerciseForm, setExerciseForm] = useState(false);
  const [exerciseInfo, setExerciseInfo] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  function handleRecord(e) {
    e.preventDefault();
    setExerciseForm(!exerciseForm);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    if (
      exerciseInfo.name &&
      exerciseInfo.category &&
      exerciseInfo.duration &&
      exerciseInfo.intensity
    ) {
      try {
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.exercise({
          name: exerciseInfo.name,
          category: exerciseInfo.category,
          duration: exerciseInfo.duration,
          intensity: exerciseInfo.intensity,
          id: appState.user.id
        });
        console.log(data);
        setAppState((prevState) => ({
          ...prevState,
          exercise: [data.exercise, ...prevState.exercise],
        }));
      } catch (err) {
        console.log(err);
      }
      setExerciseInfo((prevState) => ({
        ...prevState,
        name: "",
        category: "",
        duration: 0,
        intensity: 0,
      }));
      setExerciseForm(!exerciseForm);
    }
  }

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="barPage">
            <div className="bars-header">
              <h1>Exercise</h1>
            </div>
            {exerciseForm ? (
              <>
                <div className="bars-form">
                  <div className="barsForm-header">
                    <h1> Record Exercise</h1>
                  </div>
                  <form className="innerForm">
                    <input
                      className="barsForm-input"
                      value={exerciseInfo.name}
                      onChange={(e) =>
                        setExerciseInfo((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      name="name"
                      placeholder="Name"
                    />{" "}
                    <br />
                    <label className="bars-label" htmlFor="category" required>
                      Category
                    </label>
                    <br />
                    <select
                      style={{ width: "102%" }}
                      className="barsForm-input"
                      name="category"
                      value={exerciseInfo.category}
                      onChange={(e) =>
                        setExerciseInfo((prevState) => ({
                          ...prevState,
                          category: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">--Select a Category--</option>
                      <option value="run">Run</option>
                      <option value="bike">Bike</option>
                      <option value="life">Lift</option>
                      <option value="swim">Swim</option>
                      <option value="sports">Sports</option>
                    </select>
                    <br />
                    <div className="quantCal-input">
                      <div className="div-input">
                        <label
                          className="bars-label"
                          htmlFor="duration"
                          required
                        >
                          Duration (min)
                        </label>
                        <br />
                        <input
                          id="quantity-input"
                          type="number"
                          name="duration"
                          min="1"
                          max="100"
                          value={exerciseInfo.duration}
                          onChange={(e) =>
                            setExerciseInfo((prevState) => ({
                              ...prevState,
                              duration: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="div-input2">
                        <label
                          className="bars-label"
                          htmlFor="intenstiy"
                          required
                        >
                          Intensity
                        </label>
                        <br />
                        <input
                          id="calories-input"
                          type="number"
                          name="intensity"
                          min="0"
                          max="10"
                          value={exerciseInfo.intensity}
                          onChange={(e) =>
                            setExerciseInfo((prevState) => ({
                              ...prevState,
                              intensity: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                    <button onClick={handleSumbit} className="bars-cancel">
                      <span>Save</span>
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
                  {appState.exercise.length === 0 ? (
                    <Fragment>
                      <p className="bar-contentp">Nothing here yet.</p>
                      <button onClick={handleRecord} className="bar-button">
                        Add Exercise
                      </button>
                      <br />
                      <img src={bikepath} alt="road with a bike on it" />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                        style={{ marginTop: "2%" }}
                        onClick={handleRecord}
                        className="bar-button"
                      >
                        Add Exercise
                      </button>
                      <div id="exercise-whole">
                        {appState.exercise.map((exercise) => {
                          function separateFirstLetters(str) {
                            return str
                              .split(" ")
                              .map((word) => word.charAt(0))
                              .join("");
                          }
                          let wordImage;
                          const words = exercise.name.split(/\W+/);

                          if (words.length === 2) {
                            wordImage = separateFirstLetters(
                              exercise.name
                            ).toUpperCase();
                          } else {
                            wordImage = exercise.name.charAt(0).toUpperCase();
                          }

                          const createdAtUTC = new Date(exercise.created_at);
                          const createdAtLocal = createdAtUTC.toLocaleString();

                          return (
                            //ask about keys and how to make the unique
                            <Fragment>
                              <p className="bars-date"> {createdAtLocal}</p>
                              <div className="exercise-tiles">
                                <div className="bars-image">{wordImage}</div>
                                <p className="bars-name"> {exercise.name}</p>
                                <div className="durint-flex">
                                  <div className="dur-flex">
                                    <span className="duration-label">
                                      Duration
                                    </span>
                                    <p className="bars-duration">
                                      {exercise.duration}
                                    </p>
                                  </div>
                                  <div className="int-flex">
                                    <span className="intensity-label">
                                      Intensity
                                    </span>
                                    <p className="bars-intensity">
                                      {exercise.intensity}/10
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

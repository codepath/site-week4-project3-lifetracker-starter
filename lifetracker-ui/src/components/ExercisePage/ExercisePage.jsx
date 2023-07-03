import React, { Fragment, useState } from "react";
import bikepath from "../../assets/bikepath.jpg";
import "./ExercisePage.css";
import axios from "axios";
import { Puff } from "react-loading-icons";

export default function ExercisePage({ appState, setAppState }) {
  const [exerciseForm, setExerciseForm] = useState(false);
  const [exerciseInfo, setExerciseInfo] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  console.log(appState.exercise);
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
      setIsLoading(true);
      try {
        const res = await axios.post("http://localhost:3001/auth/exercise", {
          name: exerciseInfo.name,
          category: exerciseInfo.category,
          duration: exerciseInfo.duration,
          intensity: exerciseInfo.intensity,
          email: appState.user.email,
        });
        setAppState((prevState) => ({
          ...prevState,
          exercise: [...prevState.exercise, res.data.exercise],
        }));
      } catch (error) {
        console.log(error);
      }
      setExerciseInfo((prevState) => ({
        ...prevState,
        name: "",
        category: "",
        duration: 0,
        intensity: 0,
      }));
      setIsLoading(false);
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
                      {isLoading ? (
                        <Puff stroke="white" speed={1.25} />
                      ) : (
                        <span>Save</span>
                      )}{" "}
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
                  {appState.exercise === {} ? null : <p>Nothing here yet.</p>}
                  <button onClick={handleRecord} className="bar-button">
                    Record Exercise
                  </button>
                  <br />
                  <img src={bikepath} alt="road with a bike on it" />
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

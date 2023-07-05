import React, { Fragment, useState, useEffect } from "react";

import "./NutritionPage.css";
import Tile from "../NutritionTile/NutritionTile";
import emptycan from "../../assets/empty-fridge.jpg";
import apiClient from "../../services/apiClient";

export default function NutritionPage({ setAppState, appState }) {
  const [nutriForm, setNutriForm] = useState(false);
  const [nutriInfo, setNutriInfo] = useState({
    name: "",
    category: "",
    quantity: 0,
    calories: 0,
    image_url: null
  });

  function handleRecord(e) {
    e.preventDefault();
    setNutriForm(!nutriForm);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    if (
      nutriInfo.name &&
      nutriInfo.category &&
      nutriInfo.quantity &&
      nutriInfo.calories
    ) {
      try {
        const token = localStorage.getItem("LifeTracker_Token")
        apiClient.setToken(token)
        const { data, error, message } = await apiClient.nutrition({
              name: nutriInfo.name,
              category: nutriInfo.category,
              quantity: nutriInfo.quantity,
              calories: nutriInfo.calories,
              image_url: nutriInfo.image_url,
              email: appState.user.email
            });
        console.log(data)
          setAppState((prevState) => ({
                ...prevState,
                nutrition: [data.nutrition, ...prevState.nutrition],
              }));
    }  catch (err) {
        console.log(err);
      }
      setNutriInfo((prevState) => ({
        ...prevState,
        name: "",
        category: "",
        quantity: 0,
        calories: 0,
        image_url: ""
      }));
      setNutriForm(!nutriForm);
    }
  }
  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="barPage">
            <div className="bars-header">
              <h1>Nutrition</h1>
            </div>
            {nutriForm ? (
              <>
                <div className="bars-form">
                  <div className="barsForm-header">
                    <h1> Record Nutrition</h1>
                  </div>
                  <form className="innerForm">
                    <input
                      className="barsForm-input"
                      type="text"
                      name="name"
                      value={nutriInfo.name}
                      onChange={(e) =>
                        setNutriInfo((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
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
                      value={nutriInfo.category}
                      onChange={(e) =>
                        setNutriInfo((prevState) => ({
                          ...prevState,
                          category: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">--Select a Category--</option>
                      <option value="Snack">Snack</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Food">Food</option>
                    </select>
                    <br />
                    <div className="quantCal-input">
                      <div className="div-input">
                        <label
                          className="bars-label"
                          htmlFor="quantity"
                          required
                        >
                          Quantity
                        </label>
                        <br />
                        <input
                          value={nutriInfo.quantity}
                          onChange={(e) =>
                            setNutriInfo((prevState) => ({
                              ...prevState,
                              quantity: e.target.value,
                            }))
                          }
                          id="quantity-input"
                          type="number"
                          name="quantity"
                          min="1"
                          max="100"
                          required
                        />
                      </div>
                      <div className="div-input2">
                        <label
                          className="bars-label"
                          htmlFor="calories"
                          required
                        >
                          Calories
                        </label>
                        <br />
                        <input
                          value={nutriInfo.calories}
                          onChange={(e) =>
                            setNutriInfo((prevState) => ({
                              ...prevState,
                              calories: e.target.value,
                            }))
                          }
                          id="calories-input"
                          type="number"
                          name="calories"
                          min="0"
                          max="15000"
                          step="10"
                          required
                        />
                      </div>
                    </div>
                    <br />
                    <input
                      value={nutriInfo.image_url}
                      onChange={(e) =>
                        setNutriInfo((prevState) => ({
                          ...prevState,
                          image_url: e.target.value,
                        }))
                      }
                      className="barsForm-input"
                      type="url"
                      name="url"
                      placeholder="url for image"
                      pattern="https://.*"
                      required
                    />
                    <button onClick={handleSumbit} className="bars-cancel">
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
                  {appState.nutrition.length === 0 ? (
                    <Fragment>
                      <p className="bar-contentp">Nothing here yet.</p>
                      <button onClick={handleRecord} className="bar-button">
                        Record Nutrition
                      </button>{" "}
                      <br />
                      <img src={emptycan} alt="empty can in a fridge" />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button style={{marginTop:"2%"}} onClick={handleRecord} className="bar-button">
                        Add Nutrition
                      </button>
                      <div id="exercise-whole">
                        {appState.nutrition.map((nutrition) => {
                          return <Tile nutrition={nutrition} />;
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

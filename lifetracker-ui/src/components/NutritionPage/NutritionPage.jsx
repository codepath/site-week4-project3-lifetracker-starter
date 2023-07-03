import React, { Fragment, useState } from "react";

import "./NutritionPage.css";
import emptycan from "../../assets/empty-fridge.jpg";

export default function NutritionPage({ appState }) {
  const [nutriForm, setNutriForm] = useState(false);

  function handleRecord(e) {
    e.preventDefault();
    setNutriForm(!nutriForm);
  }
  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="barPage">
            <div className="bars-header"><h1>Nutrition</h1></div>
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
                      required
                    >
                      <option value="">--Select a Category--</option>
                      <option value="snack">Snack</option>
                      <option value="beverage">Beverage</option>
                      <option value="food">Food</option>
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
                      className="barsForm-input"
                      type="url"
                      name="url"
                      placeholder="url for image"
                      pattern="https://.*"
                      required
                    />
                  <button className="bars-cancel" >Save</button>
                  <button className="bars-cancel" onClick={handleRecord}>Cancel</button>
                  </form>
                </div>
              </>
            )  : (
              <>
                <div className="bar-content">
                <p>Nothing here yet.</p>
                <button onClick={handleRecord} className="bar-button">Record Nutrition</button> <br />
                <img src={emptycan} alt="empty can in a fridge" />
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

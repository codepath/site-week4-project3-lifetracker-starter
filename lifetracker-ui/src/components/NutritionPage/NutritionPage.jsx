import * as React from "react";
import "./NutritionPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NutritionPage({
  isLoggedIn,
  appState,
  nutritionArray,
  setExerciseArray,
}) {
  const renderNutritions = () => {
    return nutritionArray?.toReversed().map((nutrition) => (
      <div className="chakra-stack css-xixnl8" key={nutrition.id}>
        <div className="nutrition-card">
          <div className="css-56yjmq">
            <div className="css-1kw2fa0">
              <h2 className="chakra-heading css-y5314g">
                {nutrition.name}
                <span className="chakra-badge css-lvvibp"></span>
              </h2>
            </div>
          </div>
          <div className="white css-1lekzkb">
            <div className="chakra-stat css-1mbo1ls">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Calories</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {nutrition.calories}
                </dd>
              </dl>
            </div>
            <div className="chakra-stat css-1mbo1ls">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Quantity</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {nutrition.quantity}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const exerciseLoggedIn = (
    <>
      <div className="ExercisePage css-1bpnzr3">
        <div className="banner-nutrition">
          <div className="chakra-stack css-1cgbrw5">
            <h2 className="chakra-heading css-b5coes">Nutrition</h2>
          </div>
        </div>
        <div className="css-vpbd2d">
          <div className="css-1qfrez2">
            <div className="css-uiodal">
              <div className="exercise-feed">
                <a className="chakra-link button css-spn4bz">
                  <Link to="/nutrition/create">
                    <button type="button" className="chakra-button css-ez23ye">
                      Record Nutrition
                    </button>
                  </Link>
                </a>
                <div className="exercise-feed">{renderNutritions()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const exerciseNoLoggedIn = (
    <>
      <h2 className="noAuthenticated">
        Only authenticated users can view this page
      </h2>
    </>
  );

  return <>{isLoggedIn ? exerciseLoggedIn : exerciseNoLoggedIn}</>;
}

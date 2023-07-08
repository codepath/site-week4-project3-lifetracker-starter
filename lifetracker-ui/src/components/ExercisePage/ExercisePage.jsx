import * as React from "react";
import "./ExercisePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExercisePage({
  isLoggedIn,
  exerciseArray
}) {
  const renderExercises = () => {
    return exerciseArray?.toReversed().map((exercise) => (
      <div className="chakra-stack css-xixnl8" key={exercise.id}>
        <div className="css-1d1dt3r">
          <div className="css-56yjmq">
            <div className="css-1kw2fa0">
              <h2 className="chakra-heading css-y5314g">
                {exercise.name}
                <span className="chakra-badge css-lvvibp"></span>
              </h2>
            </div>
          </div>
          <div className="white css-1lekzkb">
            <div className="chakra-stat css-1mbo1ls">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Duration</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {exercise.time}
                </dd>
              </dl>
            </div>
            <div className="chakra-stat css-1mbo1ls">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Intensity</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {exercise.intensity}/10
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
        <div className="css-19cns6y">
          <div className="chakra-stack css-1cgbrw5">
            <h2 className="chakra-heading css-b5coes">Exercise</h2>
          </div>
        </div>
        <div className="css-vpbd2d">
          <div className="css-1qfrez2">
            <div className="css-uiodal">
              <div className="exercise-feed">
                <a className="chakra-link button css-spn4bz">
                  <Link to="/exercise/create">
                    <button type="button" className="chakra-button css-ez23ye">
                      Add Exercise
                    </button>
                  </Link>
                </a>
                <div className="exercise-feed">{renderExercises()}</div>
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
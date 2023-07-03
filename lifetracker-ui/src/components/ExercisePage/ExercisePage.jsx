import * as React from "react";
import "./ExercisePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExercisePage({ isLoggedIn, appState, exerciseArray, setExerciseArray }) {

    

    React.useEffect(() => {
        axios
          .get("http://localhost:3001/auth/exercise", {
            params: {
              user_id: appState?.user?.id,
            },
          })
          .then((response) => {
            const exercises = response.data.exercises;
            setExerciseArray(exercises);
            console.log("Response:", exercises); // Debugging console.log
          })
          .catch((error) => {
            console.log("Error with axios:", error); // Debugging console.log
          });
    }, []);


      const renderExercises = () => {
        return exerciseArray?.map((exercise) => (
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
                    <dt className="chakra-stat__label css-14go5ty">
                      Duration
                    </dt>
                    <dd className="chakra-stat__number css-1axeus7">
                      {exercise.time}
                    </dd>
                  </dl>
                </div>
                <div className="chakra-stat css-1mbo1ls">
                  <dl>
                    <dt className="chakra-stat__label css-14go5ty">
                      Intensity
                    </dt>
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




  const exerciseLoggedIn = 
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
                {/* <div className="chakra-stack css-xixnl8">
                  <div className="css-1d1dt3r">
                    <div className="css-56yjmq">
                      <span className="chakra-avatar css-1o2sgxf">
                        <div
                          role="img"
                          aria-label="pilates 2"
                          className="chakra-avatar__initials css-1ebyn6"
                        >
                          p2
                        </div>
                      </span>
                      <div className="css-1kw2fa0">
                        <h2 className="chakra-heading css-y5314g">
                          pilates 2
                          <span className="chakra-badge css-lvvibp"></span>
                        </h2>
                      </div>
                    </div>
                    <div className="white css-1lekzkb">
                      <div className="chakra-stat css-1mbo1ls">
                        <dl>
                          <dt className="chakra-stat__label css-14go5ty">
                            Duration
                          </dt>
                          <dd className="chakra-stat__number css-1axeus7">
                            50
                          </dd>
                        </dl>
                      </div>
                      <div className="chakra-stat css-1mbo1ls">
                        <dl>
                          <dt className="chakra-stat__label css-14go5ty">
                            Intensity
                          </dt>
                          <dd className="chakra-stat__number css-1axeus7">
                            1/10
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  

  const exerciseNoLoggedIn = 
    <>
      <h2 className="noAuthenticated">
        Only authenticated users can view this page
      </h2>
    </>
 

  return(
     <>
  {isLoggedIn ? exerciseLoggedIn : exerciseNoLoggedIn}
  </>
  )
}

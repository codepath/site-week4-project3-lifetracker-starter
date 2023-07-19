import React, { Fragment } from "react";
import image from "../../assets/tracker.jpg";
import athlete from "../../assets/athlete.jpg";
import calendar from "../../assets/calendar.jpg";
import food from "../../assets/food.jpg";
import alarm from "../../assets/alarm.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faBurger,
  faCloudMoon,
  faCalendarDays,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

export default function Home({ appState }) {
  return (
    <Fragment>
      <div className="all-home">
        <div className="home">
          <div className="home-about">
            {appState.isAuthenticated ? (
              <h1>
                Greetings, <br /> {appState.user.first_name}! &nbsp;
                <FontAwesomeIcon fontSize="80%" icon={faStopwatch} beat />
              </h1>
            ) : (
              <h1>
                {" "}
                LifeTracker <FontAwesomeIcon icon={faStopwatch} beat />
              </h1>
            )}
            <p> Helping you get your ish back together. </p>
          </div>
          <div className="home-img">
            <img src={image} alt="image of man looking at his watch" />
          </div>
        </div>

        <div style={{ marginTop: "110px" }} className="tiles">
          <Link to="/exercise">
            <div className="tile">
              <span>
                Fitness{" "}
                <FontAwesomeIcon className="icons" icon={faHeartPulse} />
              </span>
              <img src={athlete} alt="image of athlete joggin in place" />
            </div>
          </Link>
          <Link to="/nutrition">
            <div className="tile">
              <span>
                Food <FontAwesomeIcon className="icons" icon={faBurger} />
              </span>
              <img src={food} alt="image of food platter" />
            </div>
          </Link>
          <Link to="/sleep">
            <div className="tile">
              <span>
                Rest <FontAwesomeIcon className="icons" icon={faCloudMoon} />
              </span>
              <img src={alarm} alt="image of alarm clock" />
            </div>
          </Link>
          <Link to="/activity">
            <div className="tile">
              <span>
                Planner{" "}
                <FontAwesomeIcon className="icons" icon={faCalendarDays} />
              </span>
              <img src={calendar} alt="image of calendar" />
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

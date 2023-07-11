import "./Home.css";
import lifetrackerlogo from "./ImageLifetracker.png";
import food from"./food.png"
import heart from "./heart.png"
import sleep from "./sleep.png"
import planner from "./planner.png"
import { useState } from "react";

export default function Home({ loggedIn, firstName }) {
  return (
    <div className="homepage">
      <div className="Lifetracker-welcome-image">

        <div className="WelcomeText">
          <h1>LifeTracker</h1>
          <p>Helping you take back control of your world.</p>
        </div>

        <div className="lifeimage">
          <img src={lifetrackerlogo} alt="This is the image of wellness logo" />
        </div>

      </div>

      <div className="wellness-tiles">
      <div className="health-tile" >
      <h4>Fitness</h4>
      <img src={heart} alt="This is the image of Fitness logo" />
      </div>

      <div className="food-tile" >
      <h4>Food</h4>
      <img src={food} alt="This is the image of wellness logo" />
      </div>

      <div className="sleep-tile" >
      <h4>Sleep</h4>
      <img src={sleep} alt="This is the image of Sleep logo" />
      </div>

      <div className="health-tile" >
      <h4>Planner</h4>
      <img src={planner} alt="This is the image of wellness logo" />
      </div>
      </div>
      
    </div>
  );
}

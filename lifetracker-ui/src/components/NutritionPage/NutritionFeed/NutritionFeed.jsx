import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../NutritionFeed/NutritionFeed.css";
import axios from "axios";

export default function NutritionFeed({
  user,
  setAppState,
  nutritionFormState,
  setNutritionFormState,
}) {
  const [feed, setFeed] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.post(
        "https://lifetracker-server.onrender.com/nutritionfeed",
        { userId: user.id }
      );
      setFeed(res.data.nutrition);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the getData function when the component mounts or when the user prop changes
    getData();
  }, [user]);

  function generateFeed(info) {
    return (
      <div className="nutrition-card">
        <div className="media">
          <img src={info.image} />
        </div>
        <div className="nutrition-info">
          <p className="record-name">{info.name}</p>
          <br />
          <br />
          <p>
            <a className="titles">Category: </a>
            {info.category}
          </p>
          <p>
            <a className="titles">Calories: </a>
            {info.calories}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="nutrition-feed-container">
        {feed?.map((item) => generateFeed(item))}
      </div>
    </>
  );
}

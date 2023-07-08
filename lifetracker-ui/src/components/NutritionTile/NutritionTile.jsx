import React, { Fragment } from "react";
import { useState } from "react";

import "./NutritionTile.css";

export default function Tile({ nutrition }) {
  //if there is no image, this is rendered instead
  let wordImage;
  wordImage = nutrition.name.charAt(0).toUpperCase();

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    //ask about keys and how to make the unique
    <Fragment>
      <div style={{ marginTop: "2%" }} className="exercise-tiles">
        <div>
          {nutrition.image_url === null || imageError ? (
            <div style={{ marginBottom: "20px" }} className="bars-image">
              {wordImage}
            </div>
          ) : (
            <img
              style={{ marginBottom: "4%" }}
              className="bars-image"
              onError={handleImageError}
              src={nutrition.image_url}
              alt="image of nutritional food"
            />
          )}
        </div>
        <span className="bars-name">{nutrition.name} &nbsp;</span>
        <span
          style={{
            display: "inline-block",
            color: "white",
            width: "100px",
            height: "30px",
            backgroundColor: "var(--fushia)",
            fontSize: "x-large",
          }}
        >
          {nutrition.category}
        </span>
        <div className="durint-flex">
          <div className="dur-flex">
            <span className="duration-label">Calories</span>
            <p className="bars-duration">{nutrition.calories}</p>
          </div>
          <div className="int-flex">
            <span className="intensity-label">Quantity</span>
            <p className="bars-intensity">{nutrition.quantity}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import "./NutritionPage.css";
import NutritionNew from "../NutritionPage/NutritionNew";
import { useState } from "react";

export default function NutritionPage() {
  const [newNutrition, setNewNutrition] = useState(false);
  const handleNewNutritionOnClick = () => {
    setNewNutrition(true);
    console.log("clicked");
  };
  return (
    <div className="nutrition-page">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
        {newNutrition ? (
          <NutritionNew></NutritionNew>
        ) : (
          <>
            <NutritionOverview handleOnClick={handleNewNutritionOnClick} />
            <NutritionFeed />
          </>
        )}
      </div>
    </div>
  );
}

export function NutritionOverview({ handleNewNutritionOnClick }) {
  return (
    <div className="nutrition-overview">
      <div className="header">
        <h3>Overview</h3>
        <button onClick={handleNewNutritionOnClick}>Record Nutrition</button>
      </div>
    </div>
  );
}

export function NutritionFeed({ nutritions }) {
  return (
    <div className="nutrition-feed">
      {nutritions ? (
        nutritions.map(<NutritionCard />)
      ) : (
        <h1 className="empty-message">Nothing here yet</h1>
      )}
    </div>
  );
}

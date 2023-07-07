import "./NutritionOverview.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NutritionFeed from "../../NutritionFeed/NutritionFeed";

export default function NutritionOverview({ appState }) {
  return (
    <div className="nutrition-overview">
      <div className="header">
        <h3>Nutrition Overview</h3>
      </div>

      <div className="record-nutrition">
        <Link to="create">
          <span>Record Nutrition</span>
        </Link>
      </div>
      <div className="test">

      <NutritionFeed appState={appState}/>
      </div>
    </div>
  );
}

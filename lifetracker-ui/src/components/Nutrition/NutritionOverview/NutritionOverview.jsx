import "./NutritionOverview.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NutritionFeed from "../NutritionFeed/NutritionFeed";

export default function NutritionOverview({ appState, setAppState }) {
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
      <NutritionFeed setAppState={setAppState} appState={appState}/>
    </div>
  );
}

import "./NutritionOverview.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NutritionOverview() {
  return (
    <div className="nutrition-overview">
      <div className="header">
        <h3>Nutrition Overview</h3>
      </div>

      <div className="record-nutrition">
        <Link to="/nutrition/new"><span>Record Nutrition</span></Link>
      </div>
    </div>
  );
}

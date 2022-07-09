import { Link } from "react-router-dom";
import "./NutritionOverview.css";
import { useNutritionContext } from "../../contexts/nutrition";
import Loading from "../Loading/Loading";
import NutritionFeed from "../NutritionFeed/NutritionFeed";

export default function NutritionOverview() {
  const { nutrition, setNutrition, fetchNutritions, isLoading, error } =
    useNutritionContext();
  return (
    <div className="nutrition-overview">
      <div className="header">
        <h3>Overview</h3>
        <Link to="/nutrition/create">
          <button>Record Nutrition</button>
        </Link>
        <div className="error">{error ? error : ""}</div>
        {isLoading ? <Loading /> : <NutritionFeed nutritions={nutrition} />}
      </div>
    </div>
  );
}

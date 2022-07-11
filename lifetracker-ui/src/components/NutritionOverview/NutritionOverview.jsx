import { Link } from "react-router-dom";
import "./NutritionOverview.css";
import { useAuthContext } from "../../contexts/auth";
import { useNutritionContext } from "../../contexts/nutrition";
import Loading from "../Loading/Loading";
import NutritionFeed from "../NutritionFeed/NutritionFeed";

export default function NutritionOverview() {
  const { isProcessing, user } = useAuthContext();

  const { nutrition, setNutrition, fetchNutritions, isLoading, error } =
    useNutritionContext();
  return (
    <div className="nutrition-overview">
      <div className="header">
        <h3>Overview</h3>
        <Link to="/nutrition/create">
          <button>Record Nutrition</button>
        </Link>
      </div>

      <div className="error">{error ? error : ""}</div>
      {isProcessing ? <Loading /> : <NutritionFeed nutritions={nutrition} />}
    </div>
  );
}

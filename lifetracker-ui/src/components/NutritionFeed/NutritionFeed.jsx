import NutritionCard from "../Nutrition/NutritionCard/NutritionCard";
import "./NutritionFeed.css";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";

export default function NutritionFeed({ appState, setAppState }) {

    useEffect(() => {
        async function fetchUserNutrition() {
            const { data, error } = await apiClient.fetchNutritionList();
            if (data) setAppState({...appState, nutritions: data.nutritionList})
            if (error) setAppState(error);
          }
          fetchUserNutrition();
      }, [])

    if (!appState.nutritions) {
    return (
      <div className="nutrition-feed">
        <h1 className="empty-message">Nothing Here Yet</h1>
      </div>
    );
  } else {
    return (
        <div className="nutrition-feed">
            {appState.nutritions?.map((nutrition) => (
                <NutritionCard key={nutrition.id} nutrition={nutrition}/>
            ))}
        </div>
    )
  }
}

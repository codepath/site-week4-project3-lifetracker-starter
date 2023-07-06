import "./NutritionPage.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NutritionOverview from "../../components/Nutrition/NutritionOverview/NutritionOverview";
import NutritionDetail from "../../components/Nutrition/NutritionDetail/NutritionDetail";
import NutritionNew from "../../components/Nutrition/NutritionNew/NutritionNew";

export default function NutritionPage({ setAppState, appState }) {
  if (appState.user) {
    return (
      <div className="nutrition-page">
        <Routes>
          <Route path="/" element={<NutritionOverview />}></Route>
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="nutrition-page">
        <h1>Please Log In/Sign Up to get authorization for this page</h1>
      </div>
    );
  }
}

import "./NutritionPage.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NutritionOverview from "../../components/Nutrition/NutritionOverview/NutritionOverview";
import NutritionDetail from "../../components/Nutrition/NutritionDetail/NutritionDetail";
import NutritionForm from "../../components/Nutrition/NutritionForm/NutritionForm";

export default function NutritionPage({ setAppState, appState }) {
  if (appState.user) {
    return (
      <div className="nutrition-page">
        <Routes>
          <Route path="" element={<NutritionOverview setAppState={setAppState} appState={appState} />}/>
          <Route path="create" element={<NutritionForm setAppState={setAppState} appState={appState}/>}/>
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

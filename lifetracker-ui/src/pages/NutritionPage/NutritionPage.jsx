import { BrowserRouter, Routes, Route } from "react-router-dom";
import NutritionOverview from "../../components/Nutrition/NutritionOverview/NutritionOverview";
import NutritionDetail from "../../components/Nutrition/NutritionDetail/NutritionDetail";
import NutritionNew from "../../components/Nutrition/NutritionNew/NutritionNew";

export default function NutritionPage({ setAppState, appState }) {
  if (appState.isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="nutrition-page">
          <Routes>
            <Route path="/nutrition" element={<NutritionOverview />} />
            <Route path="/nutrition/create" element={<NutritionNew />} />
            <Route
              path="/nutrition/id/:nutritionId"
              element={<NutritionDetail />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

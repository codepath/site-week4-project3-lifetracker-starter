import "./NutritionPage.css";
import NutritionNew from "../NutritionNew/NutritionNew";
import NutritionOverview from "../NutritionOverview/NutritionOverview";
import NutritionDetail from "../NutritionDetail/NutritionDetail";
import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export default function NutritionPage() {
  return (
    <div className="nutrition-page">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <Routes>
        <Route path="/" element={<NutritionOverview />} />
        <Route path="/create" element={<NutritionNew />} />
        <Route path="/id/:nutritionId" element={<NutritionDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

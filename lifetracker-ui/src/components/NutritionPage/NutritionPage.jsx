import * as React from "react"
import {Routes, Route} from "react-router-dom"
import NutritionOverview from "../NutritionPage/NutritionOverview"
import NutritionNew from "../NutritionPage/NutritionNew"
import NutritionDetail from "../NutritionPage/NutritionDetail"
import NotFound from "../NotFound/NotFound"

export default function NutritionPage() {
  return (
    <div className="nutrition-page">
      <h1>Nutrition Page</h1>
      <Routes>
          <Route path="/nutrition" element={<NutritionOverview />}></Route>
          <Route path="/nutrition/create" element={<NutritionNew />}></Route>
          <Route path="/nutrition/id/:nutritionId" element={<NutritionDetail />}></Route>
          {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </div>
  )
}
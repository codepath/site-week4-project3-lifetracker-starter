import NotFound from "components/NotFound/NotFound";
import NutritionDetail from "components/NutritionDetail/NutritionDetail";
import NutritionNew from "components/NutritionNew/NutritionNew";
import NutritionOverview from "components/NutritionOverview/NutritionOverview";
import * as React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./NutritionPage.css"


export default function NutritionPage(props) {
  
    const [nutrition, setNutrition] = useState([])

    return (
      <div className="nutrition-page">
            <Routes>
                <Route path="/" element={<NutritionOverview nutrition={nutrition}/>}></Route>
                <Route path="/create" element={<NutritionNew nutrition={nutrition} setNutrition={setNutrition}/>}></Route>
                <Route path="/id/:nutritionId" element={<NutritionDetail />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
      </div>
    )
  }
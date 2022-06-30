import * as React from "react"
import { Routes, Route} from "react-router-dom"
import NutritionOverview from "components/NutritionOverview/NutritionOverview"
import "./NutritionPage.css"

export default function NutritionPage(props) {
    return (
        <div className="nutrition-page">
            <div className="Banner">
                <h1>Nutrition</h1>
            </div>
            <div className="content">
                <NutritionOverview />
            </div>
        </div>
    )
  }

  
import * as React from "react"
import {Outlet} from "react-router-dom"
import "./NutritionPage.css"


export default function NutritionPage(props) {
    return (
        <div className="nutrition-page">
            <div className="Banner">
                <h1>Nutrition</h1>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
  }

  
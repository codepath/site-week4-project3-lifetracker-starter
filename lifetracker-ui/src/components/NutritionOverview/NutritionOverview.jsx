import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"

export default function NutritionOverview(props) {
  return (
    <div className="nutrition-overview">
        <h1>Overview</h1>
        <Link to="/nutrition/create"><button id="record">Record Nutrition</button></Link>
        <NutritionFeed user={props.user} nutrition={props.nutrition}></NutritionFeed>
    </div>
  )
}
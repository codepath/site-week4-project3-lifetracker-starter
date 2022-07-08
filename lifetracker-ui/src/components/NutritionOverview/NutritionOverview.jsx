import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"
import { useNutritionContext } from "../../contexts/nutrition"
import Loading from "components/Loading/Loading"

export default function NutritionOverview() {
  const {nutritions, isLoading, error} = useNutritionContext()
  console.log(nutritions)
  return (
    <div className="nutrition-overview">
        <h1>Overview</h1>
        {error? <p className="error">{error}</p> : null}
        <Link to="/nutrition/create"><button id="record">Record Nutrition</button></Link>
        {isLoading? <Loading/> : <NutritionFeed nutritions={nutritions}></NutritionFeed>}
    </div>
  )
}
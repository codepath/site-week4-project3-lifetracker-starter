import * as React from "react"
import {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import NutritionFeed from "../NutritionPage/NutritionFeed"

export default function NutritionOverview(props) {
  return (
    <div className="nutrition-overview">
      <h1>Nutrition Overview</h1>
      <Link to="/nutrition/create"><button>Record Nutrition</button></Link>
    </div>
  )
}
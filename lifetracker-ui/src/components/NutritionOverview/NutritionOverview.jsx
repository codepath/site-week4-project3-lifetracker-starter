import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"

export default function NutritionOverview(props) {

    return (
        <div className="nutrition-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="/nutrition/create"><button className="Button outline small outline aqua">Record Nutrition</button></Link>
            </div>
            <div className="feed">
                
            </div>
        </div>
    )
  }

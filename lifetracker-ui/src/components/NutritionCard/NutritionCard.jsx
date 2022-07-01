import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./NutritionCard.css"

export default function NutritionCard(props) {
  
    return (
      <div className="nutrition-card">
        <div className="card-header">
            <h2 className="title">{props.name}</h2>
        </div>
      </div>
    )
  }
import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./NutritionCard.css"

export default function NutritionCard(props) {
  
    return (
      <div className="nutrition-card">
        <div className="card-header">
            <img src={props.image} alt="nutrition"></img>
            <h2 className="title">{props.name}</h2>
        </div>
        <div className="card-stats">
          <div className="card-stat">
            <p>Calories</p>
            <span>{props.calories}</span>
          </div>
          <div className="card-stat">
            <p>Quantity</p>
            <span>{props.quantity}</span>
          </div>
        </div>
        <div className="card-meta">
            <small>{props.time}</small>
            <small className="category">{props.category}</small>
          </div>
      </div>
    )
  }
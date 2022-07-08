import * as React from "react"
import "./NutritionCard.css"


export default function NutritionCard(props) {
  return (
    <div className="nutrition-card">
        <img className="nutrition-image" src={props.imageUrl}></img>
        <div className="nutrition-text">
        
        <p className="nutrition-calories not-name">Calories: {props.calories}</p>
        <p className="nutrition-category not-name">Category: {props.category}</p>
        <p className="nutrition-date not-name">Created at: {props.createdAt}</p>
        <p className="nutrition-quantity not-name">Quantity: {props.quantity}</p>
        <p className="nutrition-name">{props.name}</p>
        </div>
    </div>
  )
}
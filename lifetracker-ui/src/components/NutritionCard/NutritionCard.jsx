import * as React from "react"
import "./NutritionCard.css"


export default function NutritionCard(props) {
  return (
    <div className="nutrition-card">
        <img className="nutrition-image" src={props.imageUrl}></img>
        <div className="nutrition-text">
        <p className="nutrition-name">{props.name}</p>
        <p className="nutrition-calories">calories: {props.calories}</p>
        <p className="nutrition-category">category: {props.category}</p>
        <p className="nutrition-date">Created at: {props.createdAt}</p>
        </div>
    </div>
  )
}
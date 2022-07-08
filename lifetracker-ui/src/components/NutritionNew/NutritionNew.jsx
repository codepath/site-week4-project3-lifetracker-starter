import * as React from "react"
import NutritionForm from "components/NutritionForm/NutritionForm"
import "./NutritionNew.css"

export default function NutritionNew(props) {
    return (
      <div className="nutrition-new">
        <h2>Record Nutrition</h2>
        <NutritionForm nutritionItems={props.nutritionItems} setNutritionItems={props.setNutritionItems} error={props.error} setError={props.setError} totalCaloriesPerDay={props.totalCaloriesPerDay} setTotalCaloriesPerDay={props.setTotalCaloriesPerDay}/>
      </div>
    )
  }
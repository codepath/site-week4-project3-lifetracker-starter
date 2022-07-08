import NutritionForm from "components/NutritionForm/NutritionForm"
import * as React from "react"

export default function NutritionNew(props) {
  return (
    <div className="nutrition-new">
        <NutritionForm nutrition={props.nutrition} setNutrition={props.setNutrition}></NutritionForm>
    </div>
  )
}
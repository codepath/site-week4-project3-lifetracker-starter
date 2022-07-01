import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./NutritionForm.css"

export default function NutritionForm(props) {
  
    const  [nutritionForm, setNutritionForm] = React.useState({ "name" : "" , "calories" : 1, "imageUrl": "", "category": ""})

    function handleChange(evt){
        setNutritionForm((f) => ({...f, [evt.target.name]: evt.target.value}))
    }

    let navigate = useNavigate();

    async function submitNutrition(evt){
        if(nutritionForm.name == "" || nutritionForm.imageUrl == "" || nutritionForm.category == ""){
          props.setError(0)
          return
        }
        else{
          console.log()
          evt.preventDefault()
          props.setError(-1)
          props.setNutritionItems( f => [...f,nutritionForm])
          setNutritionForm({ "name" : "" , "calories" : 1, "imageUrl": "", "category": ""})
          navigate("/nutrition")
        }
      }

    return (
      <div className="nutrition-form">
        <div className="input-field">
            <label>Name</label>
            <input className="form-input" type="text" name="name" placeholder="Nutrition name" defaultValue={nutritionForm.name} onChange={handleChange}></input>
        </div>
        <div className="input-field">
            <label>Category</label>
            <input className="form-input" name="category" placeholder="Nutrition category" defaultValue={nutritionForm.category} onChange={handleChange}></input>
        </div>
        <div className="split-input-field">
            <div className="input-field">
                <label>Quantity</label>
                <input className="form-input" type="number" name="quantity" min="1" max="1000000000" defaultValue={1}></input>
            </div>
            <div className="input-field">
                <label>Calories</label>
                <input className="form-input" type="number" name="calories" min="0" max="1000000000" step="10" defaultValue={nutritionForm.calories} onChange={handleChange}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Image URL</label>
            <input className="form-input" type="text" name="imageUrl" placeholder="http://www.food-image.com/1" defaultValue={nutritionForm.imageUrl} onChange={handleChange}></input>
            {props.error == 0 ?  <span className="error">You're missing an input value</span>: null}
        </div>
        <button className="submit-nutrition" onClick={submitNutrition}>Save</button>
      </div>
    )
  }
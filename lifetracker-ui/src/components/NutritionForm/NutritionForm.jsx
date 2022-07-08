import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./NutritionForm.css"

export default function NutritionForm(props) {

    var date = new Date()
    var now = date.toLocaleString();
    var day = now.substring(0,8);
    
    const [nutritionForm, setNutritionForm] = React.useState({ "name" : "" , "calories" : 1, "imageUrl": "", "category": "", "quantity" : 1, "time": `${now}`})
    const [caloriesPerDay, setCaloriesPerDay] = React.useState({"date": `${day}`, "calories" : 1})
    
    function handleChange(evt){
        setNutritionForm((f) => ({...f, [evt.target.name]: evt.target.value}))
    }

    let navigate = useNavigate();

     function handleDays(calories){
      
      let temp = [...props.totalCaloriesPerDay]
      let alreadyThere = false;
      if(temp.length > 0){
        let i = 0;
        while(i < temp.length && alreadyThere == false){
          if(temp[i].date == caloriesPerDay.date){
            let newTotal = Number(temp[i].calories) + Number(nutritionForm.calories);
            temp[i] = {
              date: day,
              calories: newTotal
            }
            props.setTotalCaloriesPerDay(temp)
            alreadyThere = true;
          }
          i++;
        }
      }
      if(alreadyThere == false){
        props.setTotalCaloriesPerDay((f) => ([...f, caloriesPerDay]))
      }

    }
   
    async function submitNutrition(evt){
        if(nutritionForm.name == "" || nutritionForm.imageUrl == "" || nutritionForm.category == ""){
          props.setError("Missing input value")
          return
        }
        else{
          evt.preventDefault()
          props.setError("")
          props.setNutritionItems( f => [...f,nutritionForm])
          handleDays(nutritionForm.calories)
          setNutritionForm({ "name" : "" , "calories" : 1, "imageUrl": "", "category": "", "quantity" : "", "time" : ""})
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
                <input className="form-input" type="number" name="quantity" min="1" max="1000000000" defaultValue={nutritionForm.quantity} onChange={handleChange}></input>
            </div>
            <div className="input-field">
                <label>Calories</label>
                <input className="form-input" type="number" name="calories" min="0" max="1000000000" step="10" defaultValue={nutritionForm.calories} onChange={handleChange}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Image URL</label>
            <input className="form-input" type="text" name="imageUrl" placeholder="http://www.food-image.com/1" defaultValue={nutritionForm.imageUrl} onChange={handleChange}></input>
            {props.error != "" ?  <span className="error">{props.error}</span>: null}
        </div>
        <button className="submit-nutrition" onClick={submitNutrition}>Save</button>
      </div>
    )
  }
import './NutritionTable.css'
import React from "react"
import {useState} from "react"
import NutritionPage from '../NutritionPage/NutritionPage'
import axios from 'axios'
//import {useNavigate} from 'react-router-dom'
export default function NutritionTable(){
    //nutritionSubmitForm
  // const navigate = useNavigate(); 
  //  const [nutritionData, setNutritionData] = useState({})
    const [nutritionName, setNutritionName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [calories, setCalories] = useState("")
    const [category, setCategory] = useState("")
    const [image_url, setImageUrl] = useState("")

    const nutritionData = {
        name: nutritionName,
        quantity: quantity, 
        calories: calories,
        category: category,
        image_url: image_url
    }

    const handleData = (event) =>{
        event.preventDefault(); 
        console.log("inside handleData function")
        console.log("category value: ", category)
        nutritionSubmitForm(nutritionName, quantity, calories, category, image_url);
    }
 
    const  nutritionSubmitForm = async (nutritionName, quantity, calories, category, image_url) => {

        try{
        let response = await axios.post('https://lifetracker-api-txny.onrender.com/nutrition', {nutritionName, quantity, calories, category, image_url})
        }catch (error) {
            console.log(error)
        }
     
    }
    return(
        <>    
        {/* header */}
        <div  className="header-wrap"><legend className="nutrition-legend">Record Nutrition</legend></div>

        <div className="category-container">
        <form className="nutrition-form" onSubmit={handleData}>
            
        
        <label>Name:</label>
            <input 
            type="text" 
            placeholder='Name' 
            value={nutritionName} 
            required 
            onChange={(event)=> setNutritionName(event.target.value)}/>
           <br/>

           
           <label>Category *</label>
            <select required defaultValue="category-select" placeholder='Select a category' onChange={(event)=> setCategory(event.target.value)}>
                <option value="category-select" disabled>Select A Category</option>
                <option value="snack">Snack</option>
                <option value="beverage">Beverage</option>
                <option value="food">Food</option>
            </select>
            <br/>

           
            <label>Quantity:</label>
                <input required type="number" min="1" onChange={(event)=> setQuantity(event.target.value)}/>
                <br/>
           {/* <p> <label>Quantity:</label>  <span><label>Calories:</label></span></p> */}
            
            <label>Calories:</label>
                <input  required type="number" min="0" step="10" onChange={(event)=> setCalories(event.target.value)}/>
           
            
            {/*image url input*/}
            <br/>
                <label>Url:</label>
                <input required type="text" placeholder="url for image" value={image_url} onChange={(event)=> setImageUrl(event.target.value)} />
            
            <br/>
                <button className="save-btn" type="submit" >Save</button>
      
           
           
               </form>
        </div>
        </>
    )
}
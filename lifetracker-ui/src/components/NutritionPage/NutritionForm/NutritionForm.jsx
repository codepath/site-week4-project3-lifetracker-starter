import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import "../NutritionForm/NutritionForm.css"
import axios from "axios"


export default function NutritionForm({ user, setIsActive, setAppState, nutritionFormState, setNutritionFormState }) {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
      
        setNutritionFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      

      const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
    
        try {
            // Sending post request with form info
            const res = await axios.post('https://lifetracker-server.onrender.com/nutrition', {
            name: nutritionFormState.name,
            category: nutritionFormState.category, 
            calories: nutritionFormState.calories, 
            image: nutritionFormState.image,
            userId: user.id
          })
          // error handling
        } catch (err) {
          console.log(err)
          const message = err?.response?.data?.error?.message
          setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
          setIsLoading(false)
        }
        // reset state after submit
        setNutritionFormState({
            name: "",
            category:"", 
            calories: "", 
            image: ""
          })
          setIsActive(false)
      };
    
      return (
        <form className='nutrition-form' onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Name"
            value={nutritionFormState.name}
            onChange={handleOnInputChange}
            required
          />
    
          <label htmlFor="category">Category:</label>
          <select
            className="input"
            name="category"
            type="option"
            id="category"
            value={nutritionFormState.category}
            onChange={handleOnInputChange}
            required>

            <option value=''>Select Category</option>
            <option value='Snack'>Snack</option>
            <option value='Beverage'>Beverage</option>
            <option value='Food'>Food</option>

            </select>
    
          <label htmlFor="calories">Calories:</label>
          <input
            name="calories"
            placeholder="Calories"
            type="number"
            id="calories"
            value={nutritionFormState.calories}
            onChange={handleOnInputChange}
            required
          />
    
          <label htmlFor="image">Image URL:</label>
          <input
            name="image"
            placeholder="Image URL"
            type="text"
            id="image"
            value={nutritionFormState.image}
            onChange={handleOnInputChange}
            required
          />
    
          <button type="submit">Submit</button>
        </form>
      );
    };
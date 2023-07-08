import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './NutritionForm.css'
import axios from 'axios'

function NutritionForm({user, avgCalories, setAvgCalories, nutrition, setNutrition, isAuthenticated, setShowForm}) {
    const [formInput, setFormInput] = useState({name:'', category:'', quantity:0, calories:0, url: ''})
    const navigate= useNavigate()
    const email= user.email


    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name

        setFormInput({...formInput, [name]: value})
    }

    function handleSaveInput(event) {
        event.preventDefault()
        const {name, category, quantity, calories,url} = formInput
        if (isAuthenticated && name && category && quantity && calories){
            axios.post('http://localhost:3000/nutrition/create',{email, name, category, quantity, calories,url}).then((response) => {
                setShowForm(false)
                setNutrition([response.data, ...nutrition])
                let totalCal= 0
                nutrition.forEach((session) => {
                    totalCal += parseInt(session.calories);
                  });
                const newAvg= Math.floor((totalCal+ parseInt(calories))/(nutrition.length+1))
                setAvgCalories(() => newAvg)
                navigate('/nutrition')

        })
        }
        // axios.post('http://localhost:3000/')
    }

    return (
        <div className='nutrition-form'>
            <h1> Record Nutrition </h1>
            <div className='nutrition-form-inputs'>
                <form>
                    
                    <label> Name </label>
                    <input onChange={(e) => handleFormInput(e)} type= 'text' name='name' placeholder='name' required/>
                    <label> Category </label>
                    <select onChange={(e) => handleFormInput(e)}  name='category' required>
                        <option value= 'default'> Select a Category </option>
                        <option value= 'SNACK'> Snack </option>
                        <option value= 'BEVERAGE'> Beverage </option>
                        <option value= 'FOOD'> Food </option>
                    </select>
                    <label> Quantity </label>
                    <input onChange={(e) => handleFormInput(e)} type= 'number' step='1' name='quantity' required/>
                    <label> Calories </label>
                    <input  onChange={(e) => handleFormInput(e)} type='number' step='1' name='calories' required/>
                    {/* <label> url for image </label>
                    <input onChange={(e) => handleFormInput(e)} type= 'text' name='url' placeholder='url for image' required/> */}
                    <button onClick={(e) => handleSaveInput(e)}> Save </button>
                    {/* <button onClick={handleSaveInput}> Save </button> */}
                </form>
            </div>
            
        </div>
    )
}

export default NutritionForm

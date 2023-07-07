import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ExerciseForm({user, exercise, setExercise,isAuthenticated, setShowForm}) {
    const [formInput, setFormInput] = useState({name:'', category:'', duration:0, intensity:0})
    const navigate= useNavigate()
    const email= user.email

    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name

        setFormInput({...formInput, [name]: value})
    }

    function handleSaveInput(event){
        event.preventDefault()
        const {name, category, duration, intensity} = formInput
        if (isAuthenticated && name && category && duration && intensity){
            axios.post('http://localhost:3000/exercise/create',{email, name, category, duration, intensity}).then((response) => {
                setShowForm(false)
                setExercise([response.data, ...exercise])
                navigate('/exercise')

        })
        }
    }

    return (
        <div>
            <h1>  Add Exercise </h1>
            <form>
                <label> Name </label>
                <input onChange={(e) => handleFormInput(e)} type= 'text' name='name' />
                <label> Category </label>
                <select onChange={(e) => handleFormInput(e)}  name='category' required>
                    <option value= 'default'> Select a Category </option>
                    <option value= 'run'> Run </option>
                    <option value= 'bike'> Bike </option>
                    <option value= 'lift'> Lift </option>
                    <option value= 'swim'> Swim </option>
                    <option value= 'sports'> Sports </option>
                </select>
                <label> Duration (min) </label>
                <input onChange={(e) => handleFormInput(e)} type= 'number' step='1' name='duration' required/>
                <label> Intensity </label>
                <input  onChange={(e) => handleFormInput(e)} type='number' step='1' name='intensity' required/>
                <button onClick={(e) => handleSaveInput(e)}> Save </button>

            </form>
        </div>
    )
}

export default ExerciseForm

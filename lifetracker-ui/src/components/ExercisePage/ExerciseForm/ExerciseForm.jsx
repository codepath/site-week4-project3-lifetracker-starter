import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ExerciseForm.css'

function ExerciseForm({totalExercise, setTotalExercise, user, exercise, setExercise,isAuthenticated, setShowForm}) {
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
                console.log('new ex', response.data)
                setShowForm(false)
                setExercise([response.data, ...exercise])
                // const newAvg=(totalExercise+duration)/(exercise.length+1)
                setTotalExercise(() => totalExercise+parseInt(duration))
                navigate('/exercise')

        })
        }
    }

    return (
        <div className='exercise-form'>
            <h1>  Add Exercise </h1>
            <div className='exercise-form-inputs'>
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
                <input onChange={(e) => handleFormInput(e)} type= 'number' step='1' name='duration' min='1' required/>
                <label> Intensity </label>
                <input  onChange={(e) => handleFormInput(e)} type='number' step='1' name='intensity' min='1' max= '10' required/>
                <button onClick={(e) => handleSaveInput(e)}> Save </button>

            </form>
            </div>
            
        </div>
    )
}

export default ExerciseForm

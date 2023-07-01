import React, {useState, useEffect} from 'react'
import './ExercisePage.css'
import ExerciseForm from './ExerciseForm/ExerciseForm'
import axios from 'axios'

function ExercisePage() {

    // useEffect(()=> {
    //     axios.get().then((response)=> {

    //     })
    // }, [])

    const [showForm, setShowForm ] = useState(false)

    return (
        <div className='exercise-page'>
            <div className='title-container'>
                <h1> Exercise </h1>
            </div>

            {showForm ? 
                <ExerciseForm/>
            : 
                <div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={setShowForm(true)}> Add Exercise </button> </div>
                    <div className='pavement'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/bikepath-ebe31266.jpg'/> </div> 
                </div>
            

            }
            
        </div>
    )
}

export default ExercisePage


function ExerciseCard() {
    return (
        <div>

        </div>
    )
}
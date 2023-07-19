import React, {useState, useEffect} from 'react'
import './ExercisePage.css'
import ExerciseForm from './ExerciseForm/ExerciseForm'
import axios from 'axios'
import ExerciseCard from './ExerciseCard/ExerciseCard'

function ExercisePage({setTotalExercise, totalExercise, user, exercise, setExercise, isAuthenticated}) {
   

    const [showForm, setShowForm ] = useState(false)

    return (
        <div className='exercise-page'>
            <div className='title-container'>
                <h1> Exercise </h1>
            </div>

            { isAuthenticated? 
            (showForm ? 
                <ExerciseForm totalExercise={totalExercise}
                setTotalExercise={setTotalExercise} user={user} setExercise={setExercise} exercise={exercise} setShowForm={setShowForm} isAuthenticated={isAuthenticated}/>
            : 
                (exercise.length>0 ? 
                    <div> 
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Exercise </button> </div>
                    <div className='exercise-cards'>
                    {exercise.map((sesh)=> {
                    return(
                        <ExerciseCard name={sesh.name} duration={sesh.duration} intensity={sesh.intensity} category={sesh.category}/>
                        )
                    })}
                </div>
            </div> : 
            < div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Exercise </button> </div>
                    <div className='pavement'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/bikepath-ebe31266.jpg'/> </div> 
                </div>))
            : 
            <div className='unauthorized'> Login to view your data. </div>

            }
            
        </div>
    )
}

export default ExercisePage



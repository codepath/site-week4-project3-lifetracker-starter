import React, {useState, useEffect} from 'react'
import './ExercisePage.css'
import ExerciseForm from './ExerciseForm/ExerciseForm'
import axios from 'axios'

function ExercisePage({user, exercise, setExercise, isAuthenticated}) {
    // const email= user.email
    // useEffect(()=> {
    //     axios.post('http://localhost:3000/exercise', {email: email}).then((response) => {
    //       console.log('hi', response)
    //       //  setSleep(response)
    //       // setSleep(response.data)
    //     })
    //     // axios.get().then((response)=> {

    //     // })
    // }, [])

    const [showForm, setShowForm ] = useState(false)

    return (
        <div className='exercise-page'>
            <div className='title-container'>
                <h1> Exercise </h1>
            </div>

            {showForm ? 
                <ExerciseForm user={user} setExercise={setExercise} exercise={exercise} setShowForm={setShowForm} isAuthenticated={isAuthenticated}/>
            : 
                (exercise.length>0 ? 
                    <div> 
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Record Nutrition </button> </div>
                    {exercise.map((sesh)=> {
                return(
                    <div> 
                        duration: {sesh.duration}
                        <br/>
                        intensity: {sesh.intensity}
                    </div>
                )
            })}
            </div> : 
            < div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Exercise </button> </div>
                    <div className='pavement'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/bikepath-ebe31266.jpg'/> </div> 
                </div>)
            

            }
            
        </div>
    )
}

export default ExercisePage



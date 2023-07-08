import React from 'react'
import './ExerciseCard.css'

function ExerciseCard({name, category, intensity, duration}) {
    return (
        <div className='exercise-card'>
             <div className='exercise-icons'>
                <div className='exercise-name-initial'> <div> {name[0]} </div> </div>
                <div className='exercise-name'> {name} </div>
                <div className='exercise-category'> {category} </div>
             </div>

             <div className='exercise-data'> 
                <div className='exercise-duration'>
                    <p> Duration </p>
                    <h3> {duration} </h3>
                </div>
                <div className='exercise-intensity'>
                    <p> Intensity </p>
                    <h3> {intensity}/10 </h3>
                </div>

            </div>

        </div>
    )
}

export default ExerciseCard

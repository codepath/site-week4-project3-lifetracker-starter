import React from 'react'
import "./ExerciseDetail.css";

const ExerciseDetail = ({exerciseItem}) => {
  
    return (
    <div class="exerciseCard">
       <p className='Exercuse_details'> Exercise Name : {exerciseItem.exercise_name}</p>
       <p className='Exercuse_details'>Category : {exerciseItem.category}</p>
       <p className='Exercuse_details'>Duration : {exerciseItem.duration}</p>
       <p className='Exercuse_details'>Intensity : {exerciseItem.intensity}</p>
      
    </div>
  )
}

export default ExerciseDetail

import React from 'react'
import "./ExerciseDetail.css";

const ExerciseDetail = ({exerciseItem}) => {
  
    return (
    <div class="exerciseCard">
        <span><p>{exerciseItem.exercise_name}</p></span>
        <span><p>{exerciseItem.category}</p></span>
        <span><p>{exerciseItem.duration}</p></span>
        <span><p>{exerciseItem.intensity}</p></span>
      
    </div>
  )
}

export default ExerciseDetail

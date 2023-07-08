import './ExercisePage.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import ExerciseDetail from '../ExeriseDetail/ExerciseDetail';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


export default function ExercisePage({loggedIn, userId}) {
    const[exerciseList, setExerciseList]=useState([])
    console.log(userId)
    
    
useEffect(()=>{
    console.log("Ex page useeffect", userId)
    if (userId !== undefined){

        try{ axios.get(`https://lifetracker-api-txny.onrender.com/exerciseRoutes/exercisesCompleted/${userId}`)
        .then((response)=>{
            setExerciseList(response.data.exercisesCompleted)
            
        })}
        catch{(error) => {
            console.error(error);
        }}
    }
    }, [userId]);
    
    return (
        !loggedIn?(
            <div className="ActivityPage css-ra15rn">
   <div className="chakra-container css-1m340o4">
      <h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
   </div>
</div>
 )   : (
        <div>
             <div class="addExercise">
             <Link to={`/exercise/CreateExercise`}>
                <button className="addExerciseButton" >Add Exercise</button>
            </Link>
            </div>



            <div class="exerciseCards">
            {exerciseList?.map((exerciseItem, index)=>(
                <ExerciseDetail exerciseItem={exerciseItem}/>
            ))
            
            }
            </div> 

        </div>       
    ))
}

import './ExercisePage.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import ExerciseDetail from '../ExeriseDetail/ExerciseDetail';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


export default function ExercisePage({loggedIn, userId}) {
    const[exerciseList, setExerciseList]=useState([])
    
    
useEffect(()=>{
   try{ axios.get(`http://localhost:3001/exerciseRoutes/exercisesCompleted/${userId}`)
    .then((response)=>{
        setExerciseList(response.data.exercisesCompleted)
      
    })}
    catch{(error) => {
      console.error(error);
    }}
    }, []);
    console.log("GEGSERGHSRDTHSRTDFHSBDGHTS" , userId)

    return (
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
    )
}

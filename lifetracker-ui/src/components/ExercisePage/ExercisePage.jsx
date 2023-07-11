import "./ExercisePage.css"
//import ExerciseTiles from "../ExerciseTiles/ExerciseTiles"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as RouterLink} from "react-router-dom"
import ExerciseCard from "../ExerciseCard/ExerciseCard"


export default function ExercisePage({ user, exercises, isFetching, error }) {
    const [isAuthenticated, setIsAuthenticated] = useState(user?.email)
    //const isAuthenticated = Boolean(user?.email)
    console.log(user)
    console.log(user.email)
  
    

  
    const title = isAuthenticated ? "Logged In" : "Please log in to view activity."
  
    const content = isAuthenticated ? (
      <>
    
        <div className="activity-page">
              <div className="content">
                  <div className="actions"> 
                    <Link as={RouterLink} to="/exercise/create">
                        <button className="btn primary">Add Exercise</button>
                    </Link>
                  </div>
                  {error ? <h2 className="error">{error}</h2> : null}
                  {isFetching ? <h2>Loading...</h2> : null}
                  {exercises?.map((exercise) => (
                  <ExerciseCard exercises={exercises} index={exercise.id} user={user} />
                   ))}
                  
              </div>
          </div>
      </>
    ) : (
      <p className="appt">Please log in to view activity</p>
    )
  

  
    return (
      <div className="Portal">
        <div className="content">
          {isAuthenticated ? <h1> Exercises </h1> : null}
  
          <div className="card">
            <div className="header">
              <div className={`title ${isAuthenticated ? "green" : ""}`}>{title}</div>
            </div>
            <div className="content">{content}</div>
          </div>
        </div>

        <div className="media">
          {/* <img src={medicalCare} alt="medical care" /> */}
        </div>
      </div>
    )
  }
  
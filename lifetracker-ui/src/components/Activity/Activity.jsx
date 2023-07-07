import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import { useState, useEffect } from "react"
import axios from "axios"

import "./Activity.css"

export default function Activity({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)
  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }
  const title = isAuthenticated ? "Below are your activities" : "Please login to see the portal"


  const [averageCalories, setAverageCalories] = useState(0.00)
  const getCaloriesData = async () => {
  try {
      const res = await axios.post('https://lifetracker-server.onrender.com/nutritionavgcalories', {userId: user?.id})
      setAverageCalories(res.data.nutrition.average === null ? 0.00 : res.data.nutrition.average)
  }catch (error){
      console.log(error)
  }}
  useEffect(() => {
      // Call the getData function when the component mounts or when the user prop changes
      getCaloriesData();
  }, [user]);






  const content = isAuthenticated ? (
    <div className="activity-page">
    <div className="title-container">
    <h1 className="title">Welcome, {user.firstName}!</h1>
    </div>

      <div className="content">
      <h2>Activity Feed</h2>
      <div className="box-container">
        <div className="box exercise">
          <p>Total Exercise Minutes</p>
        </div>
        <div className="box sleep">
          <p>Average Hours of Sleep</p>
        </div>
        
        <div className="box calories">
        <Link to='/nutrition'>
          <p>Average Daily Calories</p>
          <div className="info-container">
          <p className="info">{averageCalories.toFixed(2)}</p>
          </div>
          </Link>
        </div> 
        
        <div className="box stats">
          <p>More Stats</p>
        </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="appt">{title}</p>
  );


  return (
    <>
      

    <div>{content}</div>
      
    
    </>
  );
}
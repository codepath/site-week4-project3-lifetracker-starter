import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import NutritionForm from "./NutritionForm/NutritionForm";


export default function NutritionPage({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email);
  const title = isAuthenticated
    ? "Below are your activities"
    : "Please login";
  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  };
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(false)
  const [nutritionFormState, setNutritionFormState] = useState({
    name: "",
    category:"", 
    calories: "", 
    image: ""
  })

  const content = isAuthenticated ? (
    <>
    <h2>Nutrition Feed</h2>
    
    <button onClick={ () => { setIsActive(!isActive)}}>Record Nutrition</button>
    
      </>
  ) : (
    <p className="appt">{title}</p>
  );

  const form = isActive?
    <NutritionForm user={user} setAppState={setAppState} nutritionFormState={nutritionFormState} setNutritionFormState={setNutritionFormState}/>
  :
  content


  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  );

  return (
    <>
      

    <div>{form}</div>
    {button}
      
    
    </>
  );
}

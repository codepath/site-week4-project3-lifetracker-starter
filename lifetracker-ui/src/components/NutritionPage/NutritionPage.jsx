import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import NutritionForm from "./NutritionForm/NutritionForm";
import NutritionFeed from "./NutritionFeed/NutritionFeed";



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

  const authContent = isAuthenticated ? (
    <>
    <h2>Nutrition Feed</h2>
    
    <button onClick={ () => { setIsActive(!isActive)}}>Record Nutrition</button>
    

    <NutritionFeed user={user} setAppState={setAppState} nutritionFormState={nutritionFormState} setNutritionFormState={setNutritionFormState}/>


      </>
  ) : (
    <p className="appt">{title}</p>
  );

  const content = isActive?
    <>
    <button onClick={ () => { setIsActive(!isActive)}}>Go Back</button>
    <NutritionForm user={user} setAppState={setAppState} nutritionFormState={nutritionFormState} setNutritionFormState={setNutritionFormState}/>
    </>
  :
  authContent


  return (
    <>
      

    <div>{content}</div>
      
    
    </>
  );
}

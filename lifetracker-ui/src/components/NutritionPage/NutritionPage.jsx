import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import NutritionForm from "./NutritionForm/NutritionForm";
import NutritionFeed from "./NutritionFeed/NutritionFeed";
import '../NutritionPage/NutritionPage.css'



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
    <div className="NutritionPage">
    <h2 className="title">Nutrition Feed</h2>
    
    <div className="button-container">
    <button className="form-button" onClick={ () => { setIsActive(!isActive)}}>Record Nutrition</button>
    </div>

    <NutritionFeed user={user} setAppState={setAppState} nutritionFormState={nutritionFormState} setNutritionFormState={setNutritionFormState}/>


    </div>
  ) : (
    <p className="appt">{title}</p>
  );

  const content = isActive?
    <>
    <div className="button-container">
    <button className="form-button" onClick={ () => { setIsActive(!isActive)}}>Go Back</button>
    </div>
    <NutritionForm user={user} setIsActive={setIsActive} setAppState={setAppState} nutritionFormState={nutritionFormState} setNutritionFormState={setNutritionFormState}/>
    </>
  :
  authContent


  return (
    <>
      

    <div>{content}</div>
      
    
    </>
  );
}

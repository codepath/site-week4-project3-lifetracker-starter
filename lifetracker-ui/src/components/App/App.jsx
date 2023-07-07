import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import { useState, useEffect } from "react"
import ExercisePage from "../ExercisePage/ExercisePage";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import jwtDecode from "jwt-decode"
import axios from "axios";
import NutritionPage from "../NutritionPage/NutritionPage";
import NutritionForm from "../NutritionForm/NutritionForm";

export default function App() {
  const [appState, setAppState] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [exerciseArray, setExerciseArray] = useState([]);
  const [exerciseTime, setExerciseTime] = useState();
  const [exerciseAvg, setExerciseAvg] = useState();

  const [nutritionArray, setNutritionArray] = useState([]);

  const [nutritionCalories, setNutritionCalories] = useState()
  const [nutritionMax, setNutritionMax] = useState()


  useEffect(() => {
    if (appState.user_id) {
      console.log(appState)
      axios
        .get("https://lifetracker-api-tifu.onrender.com/auth/exercise", {
          params: {
            user_id: appState.user_id,
          },
        })
        .then((response) => {
          const exercises = response.data.exercises;
          const exerciseTime = response.data.exerciseTime;
          const exerciseAvg = response.data.exerciseAvg;
          setExerciseAvg(exerciseAvg === null ? 0.00 : (parseInt(exerciseAvg).toFixed(1)));
          setExerciseArray(exercises);
          setExerciseTime(exerciseTime === null ? 0.00 : (parseInt(exerciseTime).toFixed(1)));
        })
        .catch((error) => {
          console.log("Error with axios:", error); // Debugging console.log
        });
    }
  }, [appState.user_id]);


  /////////

  useEffect(() => {
    if (appState.user_id) {
      console.log(appState)
      axios
        .get("https://lifetracker-api-tifu.onrender.com/auth/nutrition", {
          params: {
            user_id: appState.user_id,
          },
        })
        .then((response) => {
          const nutritions = response.data.nutritions;
          setNutritionArray(nutritions);
          const nutritionCalories = response.data.nutritionCalories;
          const nutritionMax = response.data.nutritionMax;
          setNutritionCalories(nutritionCalories === null ? 0.00 : (parseInt(nutritionCalories).toFixed(1)))
          setNutritionMax(nutritionMax === null? 0.00 : (parseInt(nutritionMax).toFixed(1)))
        })
        .catch((error) => {
          console.log("Error with axios:", error); // Debugging console.log
        });
    }
  }, [appState.user_id]);



  ////////

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // decode stored token
        const decodedToken = jwtDecode(token);
            setAppState(decodedToken);
        // check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      }
    };
  
    checkLoggedIn();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn= {setIsLoggedIn} setAppState={setAppState}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage appState={appState} setAppState={setAppState} setIsLoggedIn= {setIsLoggedIn}/>} />
         <Route path="/register" element={<RegistrationPage appState={appState} setAppState={setAppState} setIsLoggedIn= {setIsLoggedIn}/>} />
          <Route path="/activity" element={<ActivityPage appState={appState} isLoggedIn = {isLoggedIn} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray} exerciseTime= {exerciseTime} exerciseAvg = {exerciseAvg} setExerciseTime = {setExerciseTime} setExerciseAvg = {setExerciseAvg} nutritionCalories ={nutritionCalories} setNutritionCalories = {setNutritionCalories} nutritionMax = {nutritionMax} setNutritionMax = {setNutritionMax}/>} /> 
          <Route path="/exercise" element={<ExercisePage isLoggedIn = {isLoggedIn} appState={appState} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray}/>} />  
          <Route path="/exercise/create" element={<ExerciseForm isLoggedIn = {isLoggedIn} appState={appState} setExerciseArray={setExerciseArray}/>} />
          <Route path="/nutrition" element={<NutritionPage isLoggedIn = {isLoggedIn} appState={appState} nutritionArray ={nutritionArray} setNutritionArray={setNutritionArray}/>} />
          <Route path="/nutrition/create" element={<NutritionForm isLoggedIn = {isLoggedIn} appState={appState} nutritionArray ={nutritionArray} setNutritionArray={setNutritionArray}/>} />
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

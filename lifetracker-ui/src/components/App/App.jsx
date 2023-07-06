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

export default function App() {
  const [appState, setAppState] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [exerciseArray, setExerciseArray] = useState([]);
  const [exerciseTime, setExerciseTime] = useState();
  const [exerciseAvg, setExerciseAvg] = useState();

  console.log('app', exerciseArray)

  // useEffect(() => {
  //   const checkLoggedIn = () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       // Decode stored token
  //       const decodedToken = jwtDecode(token);
  //       setAppState(decodedToken);
  //       console.log(decodedToken)
  //       setIsLoggedIn(true);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  ////////////

  React.useEffect(() => {
    if (appState.user_id) {
      axios
        .get("http://localhost:3001/auth/exercise", {
          params: {
            user_id: appState.user_id,
          },
        })
        .then((response) => {
          const exercises = response.data.exercises;
          const exerciseTime = response.data.exerciseTime;
          const exerciseAvg = response.data.exerciseAvg;
          // console.log("AVERAGE: ", parseInt(exerciseAvg).toFixed(1));
          setExerciseAvg(parseInt(exerciseAvg).toFixed(1));
          setExerciseArray(exercises);
          setExerciseTime(exerciseTime);
          // console.log('amount of time', exerciseTime)
          

        })
        .catch((error) => {
          console.log("Error with axios:", error); // Debugging console.log
        });
    }
  }, [appState.user_id]);


  /////////

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
          <Route path="/activity" element={<ActivityPage appState={appState} isLoggedIn = {isLoggedIn} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray} exerciseTime= {exerciseTime} exerciseAvg = {exerciseAvg}/>} /> 
          <Route path="/exercise" element={<ExercisePage isLoggedIn = {isLoggedIn} appState={appState} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray}/>} />  
          <Route path="/exercise/create" element={<ExerciseForm isLoggedIn = {isLoggedIn} appState={appState} setExerciseArray={setExerciseArray}/>} />
          {/* <Route path="/nutrition/*" element={<AccessForbidden />} />
          <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

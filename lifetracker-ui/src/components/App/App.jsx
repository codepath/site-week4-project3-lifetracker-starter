import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import { useState } from "react"
import ExercisePage from "../ExercisePage/ExercisePage";
import ExerciseForm from "../ExerciseForm/ExerciseForm";

export default function App() {
  const [appState, setAppState] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [exerciseArray, setExerciseArray] = useState([]);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn= {setIsLoggedIn} setAppState={setAppState}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setAppState={setAppState} setIsLoggedIn= {setIsLoggedIn}/>} />
         <Route path="/register" element={<RegistrationPage setAppState={setAppState} setIsLoggedIn= {setIsLoggedIn}/>} />
          <Route path="/activity" element={<ActivityPage appState={appState} isLoggedIn = {isLoggedIn} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray}/>} /> 
          <Route path="/exercise" element={<ExercisePage isLoggedIn = {isLoggedIn} appState={appState} exerciseArray ={exerciseArray} setExerciseArray={setExerciseArray}/>} />  
          <Route path="/exercise/create" element={<ExerciseForm isLoggedIn = {isLoggedIn} appState={appState}/>} />
          {/* <Route path="/nutrition/*" element={<AccessForbidden />} />
          <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

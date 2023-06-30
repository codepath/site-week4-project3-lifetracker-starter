import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "../Navbar/Navbar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "../ExercisePage/ExercisePage";
import NutritionPage from "../NutritionPage/NutritionPage";
import SleepPage from "../SleepPage/SleepPage";


function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: {},
    sleep: {},
    exercise: {},
  });

  console.log(appState.isAuthenticated, appState.user)
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
        <Route path="/activity" element={<ActivityPage appState={appState} setAppState={setAppState} />} />
        <Route path="/exercise" element={<ExercisePage appState={appState} setAppState={setAppState} />} />
        <Route path="/nutrition" element={<NutritionPage appState={appState} setAppState={setAppState} />} />
        <Route path="/sleep" element={<SleepPage appState={appState} setAppState={setAppState} />} />
          <Route path="/" element={<Home appState={appState} setAppState={setAppState}/>} />
          <Route path="/login" element={<Login appState={appState} setAppState={setAppState}/>} />
          <Route path="/register" element={<Register appState={appState} setAppState={setAppState}/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

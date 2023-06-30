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

  console.log(appState.isAuthenticated, appState.user);
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar appState={appState} setAppState={setAppState} />
        <Routes>
          <Route
            path="/activity"
            element={<ActivityPage appState={appState} />}
          />
          <Route
            path="/exercise"
            element={<ExercisePage appState={appState} />}
          />
          <Route
            path="/nutrition"
            element={<NutritionPage appState={appState} />}
          />
          <Route path="/sleep" element={<SleepPage appState={appState} />} />
          <Route path="/" element={<Home appState={appState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/register"
            element={<Register setAppState={setAppState} />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

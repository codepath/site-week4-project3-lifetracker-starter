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
import apiClient from "../../services/apiClient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
    averageDailyCalories: 0,
    averageExerciseInt: 0,
    avgSleepHours: 0,
    maxCalsInOneMeal: 0,
    sumExerciseMins: 0,
    totalNumSleep: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [randomnum, setRandomNum] = useState(0);

  useEffect(() => {
    console.log("useeffect runs");
    const token = localStorage.getItem("LifeTracker_Token");
    apiClient.setToken(token);
    async function fetchUser() {
      if (token) {
        try {
          const { data, error, message } = await apiClient.me();
          if (error) {
            setAppState((prevState) => ({
              ...prevState,
              isAuthenticated: false,
            }));
            localStorage.setItem("LifeTracker_Token", null);
            return;
          }
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
            nutrition: data.nutrition,
            sleep: data.sleep,
            exercise: data.exercise,
          }));
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.setItem("LifeTracker_Token", null);
      }
    }
    fetchUser().then( () => {
      setIsLoading(false);
    })
    
  }, [appState.isAuthenticated]);

  useEffect(() => {
    let randomNum = Math.floor(Math.random() * 100);
    setRandomNum(randomNum);
  });

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar appState={appState} setAppState={setAppState} />
        <Routes>
          <Route
            path="/activity"
            element={
              <ActivityPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/exercise"
            element={
              <ExercisePage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/nutrition"
            element={
              <NutritionPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/sleep"
            element={
              <SleepPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/"
            element={
              isLoading ? (
                <>
                <h1 className="loading-header">Lucky Number!</h1>
                <div className="loading">{randomnum}</div>
                </>
              ) : (
                <Home appState={appState} />
              )
            }
          />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/register"
            element={<Register setAppState={setAppState} />}
          />
          <Route path="*" element={<AccessForbidden />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

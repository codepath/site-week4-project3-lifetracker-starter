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

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: []
  });

  useEffect(() => {
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
          console.error(err)
        }
      } else {
        localStorage.setItem("LifeTracker_Token", null);
      }
    }
    fetchUser();
  }, [appState.isAuthenticated]);

  console.log(appState);
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

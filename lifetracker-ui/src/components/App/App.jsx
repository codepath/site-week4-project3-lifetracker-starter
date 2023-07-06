import "./App.css";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../../pages/Landing/Landing";
import RegisterPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";
import apiClient from "../../../services/apiClient";
import NutritionPage from "../../pages/NutritionPage/NutritionPage"

function App() {
  const [appState, setAppState] = useState({
    user: "",
    isAuthenticated: false,
    nutrition: "",
    sleep: "",
    exercise: "",
  });

  // useEffect(() => {
  //   if (appState.isAuthenticated) {
  //     async function fetchUser() {
  //       const { data, error } = await apiClient.fetchUserFromToken();
  //       if (data) setAppState({ ...appState, user: data.user });
  //       if (error) setAppState(error);
  //     }

  //     const token = localStorage.getItem("lifetracker_token");
  //     if (token) {
  //       apiClient.setToken(token);
  //       fetchUser();
  //     }
  //   }
  // }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar appState={appState} setAppState={setAppState} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={<RegisterPage setAppState={setAppState} appState={appState}/>}
          />
          <Route
            path="/login"
            element={
              <LoginPage setAppState={setAppState} appState={appState} />
            }
          />
          <Route path="/nutriton" element={<NutritionPage/>}/>
          <Route
            path="/activity"
            element={
              <ActivityPage setAppState={setAppState} appState={appState} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

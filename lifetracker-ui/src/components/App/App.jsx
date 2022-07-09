import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import {
  NutritionContextProvider,
  useNutritionContext,
} from "../../contexts/nutrition";
import {
  ActivityContextProvider,
  useActivityContext,
} from "../../contexts/activity";

import {
  Navbar,
  NutritionPage,
  Landing,
  LoginPage,
  RegistrationPage,
  ActivityPage,
  ExercisePage,
  SleepPage,
  NotFound,
  ProtectedRoute,
} from "components";
import "./App.css";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <NutritionContextProvider>
        <App />
      </NutritionContextProvider>
    </AuthContextProvider>
  );
}

export function App() {
  const { user } = useAuthContext();
  const { setNutrition, fetchNutritions } = useNutritionContext();
  // // useEffect(() => {
  // //   const fetchNutritionList = async () => {
  // //     if (error) {
  // //       setError(error);
  // //     }
  // //   };

  //   fetchNutritionList();
  // }, []);

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/activity"
              element={<ProtectedRoute element={<ActivityPage />} />}
            />
            <Route
              path="/nutrition/*"
              element={<ProtectedRoute element={<NutritionPage />} />}
            />
            <Route
              path="/exercise"
              element={<ProtectedRoute element={<ExercisePage />} />}
            />
            <Route
              path="/sleep"
              element={<ProtectedRoute element={<SleepPage />} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

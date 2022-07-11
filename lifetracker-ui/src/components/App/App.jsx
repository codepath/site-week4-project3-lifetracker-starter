import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";
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
        <ActivityContextProvider>
          <App />
        </ActivityContextProvider>
      </NutritionContextProvider>
    </AuthContextProvider>
  );
}

export function App() {
  const { user, setUser, error, setError, setInitialized, setIsProcessing } =
    useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }
      setInitialized(true);
      setIsProcessing(false);
    };

    const token = localStorage.getItem("lifetracker_token");

    if (token) {
      apiClient.setToken(token);
      setIsProcessing(true);
      setError(null);
      fetchUser();
    }

    setInitialized(true);
  }, []);

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

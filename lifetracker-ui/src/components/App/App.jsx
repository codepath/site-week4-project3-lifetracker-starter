import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
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
  AccessForbidden,
  ProtectedRoute,
} from "components";
import apiClient from "../../services/apiClient";
import "./App.css";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export function App() {
  const { user, setUser } = useAuthContext();
  const [nutritions, setNutritions] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchNutritionList = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listNutritions();
      if (data) {
        setNutritions(data.nutritions);
      }
      if (error) {
        setError(error);
      }

      setIsFetching(false);
    };

    fetchNutritionList();
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
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NutritionPage from "../NutritionPage/NutritionPage";
import Landing from "../Landing/Landing";
import { useState, useEffect } from "react";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "components/ExercisePage/ExercisePage";
import SleepPage from "components/SleepPage/SleepPage";
import NotFound from "../NotFound/NotFound";
import { AuthContextProvider, useAuthContext } from "../../contexts/contexts";
import apiClient from "../../../services/apiClient";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export function App() {
  const [user, setUser] = useState({});
  const [nutritions, setNutritions] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchNutritionList = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listNutrition();
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
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/nutrition/*" element={<NutritionPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

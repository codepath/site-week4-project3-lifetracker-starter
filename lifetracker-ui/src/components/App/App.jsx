import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NutritionPage from "../NutritionPage/NutritionPage";
import Landing from "../Landing/Landing";
import { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import NotFound from "../NotFound/NotFound";
import { AuthContextProvider, useAuthContext } from "../../contexts/contexts";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export function App() {
  const { user, setUser } = useAuthContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

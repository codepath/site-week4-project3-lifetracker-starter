import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          {/* <Route path="/activity" element={<AccessForbidden />} />  only if the user is NOT logged in*/}
          <Route path="/nutrition/*" element={<NutritionPage />} />
          <Route path="/nutrition/*" element={<AccessForbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "components/Navbar/Navbar";
import LandingPage from "components/LandingPage/LandingPage";
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <LandingPage />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                    <LoginPage />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Navbar />
                    <RegistrationPage />
                  </>
                }
              />
              <Route
                path="/activity"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="/nutrition/*"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                  </>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

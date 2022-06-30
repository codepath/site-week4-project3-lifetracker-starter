import * as React from "react"
import { useState } from "react"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import NotFound from "../NotFound/NotFound"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

export default function App() {
  const [appState, setAppState] = useState({}) // keeps track of user login status

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                (
                  <>
                    <LandingPage />
                  </>
                )
              }
              />
              <Route path="/login" element={
                (
                  <>
                    <LoginPage setAppState={setAppState} />
                  </>
                )
              }
              />
              <Route path="/register" element={
                (
                  <>
                    <RegistrationPage setAppState={setAppState} />
                  </>
                )
              }
              />
              <Route path="/activity" element={
                (
                  <>
                    <ActivityPage />
                  </>
                )
              }
              />
              <Route path="/nutrition/*" element={
                (
                  <>
                    <NutritionPage />
                  </>
                )
              }
              />
              <Route path="*" element={
                (
                  <>
                    <NotFound />
                  </>
                )
              }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

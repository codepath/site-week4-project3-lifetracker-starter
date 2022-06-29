import * as React from "react"
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
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={
                (
                  <>
                    <Navbar />
                    <LandingPage />
                  </>
                )
              }
              />
              <Route path="/login" element={
                (
                  <>
                    <LoginPage />
                  </>
                )
              }
              />
              <Route path="/register" element={
                (
                  <>
                    <RegistrationPage />
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

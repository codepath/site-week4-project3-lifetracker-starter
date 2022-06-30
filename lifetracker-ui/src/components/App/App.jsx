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
                    <Navbar />
                    <LoginPage />
                  </>
                )
              }
              />
              <Route path="/register" element={
                (
                  <>
                    <Navbar />
                    <RegistrationPage />
                  </>
                )
              }
              />
              <Route path="/activity" element={
                (
                  <>
                    <Navbar />
                    <ActivityPage />
                  </>
                )
              }
              />
              <Route path="/nutrition/*" element={
                (
                  <>
                    <Navbar />
                    <NutritionPage />
                  </>
                )
              }
              />
              <Route path="*" element={
                (
                  <>
                    <Navbar />
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

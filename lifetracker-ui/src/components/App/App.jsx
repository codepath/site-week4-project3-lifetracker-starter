import "./App.css"
import * as React from "react"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<RegistrationPage
                                              isLoggedIn={isLoggedIn} />} />
            <Route path="/activity" element={ isLoggedIn ? <ActivityPage /> : <AccessForbidden />} />
            <Route path="/nutrition/*" element={<NutritionPage />} />
            {/* MAKE ROUTES ADDITIONAL FOR... 
            /sleep
            /exercise when I have the time
             */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>      
      </React.Fragment>
    </div>
  )
}

import * as React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"

import Navbar from "components/Navbar/Navbar"
import Landing from "components/Landing/Landing"
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import ActivityPage from "components/ActivityPage/ActivityPage";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import NutritionPage from "components/NutritionPage/NutritionPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [appState, setAppState] = useState({})

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
            <Routes>
              <Route path="/" element={<Landing/>}></Route>
              <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAppState={setAppState}/>}></Route>
              <Route path="/register" element={<RegistrationPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAppState={setAppState}/>}></Route>
              <Route path="/activity" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
              <Route path="/nutrition/*" element={isLoggedIn ? (<NutritionPage/>) : (<AccessForbidden/>)}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

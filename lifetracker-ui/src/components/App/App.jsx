import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
//import ActivityPage from "../ActivityPage/ActivityPage"
//import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"

import './App.css'

function App() {
           /* <Route path = "/activity" element = {<ActivityPage/> }/>
           <Route path = "/nutrition/*" element = {<NutritionPage/>}/>
           */

  return (
    <div className = "app">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<LoginPage/>}/>
          <Route path = "/register" element = {<RegistrationPage/>} />

          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

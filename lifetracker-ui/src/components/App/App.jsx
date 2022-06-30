import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./Navbar/Navbar"
import Landing from "./Landing/Landing"
import LoginPage from "./LoginPage/LoginPage"
import RegistrationPage from "./RegistrationPage/RegistrationPage"
import ActivityPage from "./ActivityPage/ActivityPage"
import NutritionPage from "./NutritionPage/NutritionPage"
import NotFound from "./NotFound/NotFound"

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegistrationPage />} /> 
            <Route path='/activity' element={<ActivityPage />} />  
            {/* AccessForbidden component with conditional statement */}
            <Route path='/nutrition/*' element={<NutritionPage />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        
      </React.Fragment>
    </div>
  )
}

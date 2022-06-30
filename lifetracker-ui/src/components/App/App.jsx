import * as React from "react"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "components/LandingPage/LandingPage"
import Navbar from "components/Navbar/Navbar"
import LoginPage from "components/LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import ActivityPage from "components/ActivityPage/ActivityPage"
import NutritionPage from "components/NutritionPage/NutritionPage"
import "./App.css"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>

          <main>

            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
            
              <Route path = "/" element={<LandingPage />} />

                
              <Route path = "/login" element={<LoginPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}  />}/>
              <Route path = "/register" element={<RegistrationPage user={user} setUser={setUser} />}/>

               {/* Need to figure out when user is logged in to register Activity
              and Nutrition, otherwise render AccessForbidden */}
              <Route path = "/activity" element={<ActivityPage isLoggedIn={isLoggedIn} />}/>
              <Route path = "/nutrition/*" element={<NutritionPage isLoggedIn={isLoggedIn} />}/>
              {/* <Route path="*" element={<NotFound />}></Route> */}
              
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

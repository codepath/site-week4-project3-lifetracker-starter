import * as React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import apiClient from "../../services/apiClient"
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
  const [nutrition, setNutrition] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  // useEffect(() => {
  //   const fetchNutrition = async () => {
  //     setIsFetching(true)

  //     const { data, error } = await apiClient.listNutrition()
  //     if(data) setNutrition(data.nutrition)
  //     if (error) setError(error)

  //     setIsFetching(false)
  //   }
  //   fetchNutrition()
  // },[])

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if(data) setUser(data.user)
      if (error) setError(error)
    }
    const token = localStorage.getItem("lifetracker_token")
    if(token) {
      apiClient.setToken(token)
      fetchUser()
    }
  },[])

  const addNutrition = (newNut) => {
    setNutrition((oldNut) => [newNut, ...oldNut])
  }

  const updateNutrition = ({ nutId, nutUpdate}) => {
    setNutrition((oldNut) => {
      return oldNut.map((nut) =>{
        if(nut.id === Number(nutId)) {
          return {...nut, ...nutUpdate}
        }  
        return nut
      })
    })
  }

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

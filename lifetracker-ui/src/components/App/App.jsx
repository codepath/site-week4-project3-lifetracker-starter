import * as React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import API from "../../services/apiClient";

import Navbar from "components/Navbar/Navbar"
import Landing from "components/Landing/Landing"
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import ActivityPage from "components/ActivityPage/ActivityPage";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import NutritionPage from "components/NutritionPage/NutritionPage";

export default function App() {
  const [user, setUser] = useState({})
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, err } = await API.fetchUserFromToken()
      if (data) {
        setUser(data.user)
      }
      if(err){
        setError(err)
      }
    }

    const token = localStorage.getItem("my_token")
    if (token) {
      API.setToken(token)
      fetchUser()
    }
  }, [])

  const handleLogout = async () => {
    await API.logoutUser()
    setUser({})
    setError(null)
  }


  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar user={user} setUser={setUser} handleLogout={handleLogout}></Navbar>
            <Routes>
              <Route path="/" element={<Landing/>}></Route>
              <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>}></Route>
              <Route path="/register" element={<RegistrationPage user={user} setUser={setUser}/>}></Route>
              <Route path="/activity" element={user?.email ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
              <Route path="/nutrition/*" element={user?.email ? (<NutritionPage user={user}/>) : (<AccessForbidden/>)}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

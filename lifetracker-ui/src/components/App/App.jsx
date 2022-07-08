import * as React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import API from "../../services/apiClient";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import { ActivityContextProvider, useActivityContext } from "../../contexts/activity";


import Navbar from "components/Navbar/Navbar"
import Landing from "components/Landing/Landing"
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import ActivityPage from "components/ActivityPage/ActivityPage";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import NutritionPage from "components/NutritionPage/NutritionPage";
import { NutritionontextProvider } from "../../contexts/nutrition";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <ActivityContextProvider>
        <NutritionontextProvider>
        <App />
        </NutritionontextProvider>
      </ActivityContextProvider>
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser} = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)


  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Landing/>}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/register" element={<RegistrationPage/>}></Route>
              <Route path="/activity" element={user?.email ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
              <Route path="/nutrition/*" element={user?.email ? (<NutritionPage/>) : (<AccessForbidden/>)}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

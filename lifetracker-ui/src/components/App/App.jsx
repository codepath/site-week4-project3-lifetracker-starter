import * as React from "react"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import Landing from "../LandingPage/Landing"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState} from "react"
import {AuthContextProvider, useAuthContext} from "../../contexts/auth"

//  export default function AppContainer()
//  {
//    return(
//      <AuthContextProvider>
//          <App />
//      </AuthContextProvider>
//    )
//  }

export default function App() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: ""
  })

  return (
    <div className="app">
      <React.Fragment>
        {/* YOUR CODE HERE! */}
            <BrowserRouter>
                <Navbar />
                <Routes>
                      <Route path="/" element={<Landing />}></Route>
                      <Route path="/login" element={<LoginPage />}></Route>
                      <Route path="/register" element={<RegistrationPage form={form} setForm={setForm}/>}></Route>
                      <Route path="/activity" element={<ActivityPage />}></Route>
                      <Route path="/nutrition/*" element={<NutritionPage />}></Route>
                      <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

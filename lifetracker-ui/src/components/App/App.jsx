import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "components/LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import ActivityPage from "components/ActivityPage/ActivityPage"
import NutritionPage from "components/NutritionPage/NutritionPage"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import "./App.css"

export default function App() {
  const [loginForm, setLoginForm] = React.useState({ "email" : "", "password" : ""})
  const [registrationForm, setRegistrationForm] = React.useState({ "email" : "", "username" : "", "firstName" : "", "lastName" : "", "password" : "", "passwordConfirm" : ""})
  const [isLogged, setIsLogged] = React.useState(false)
  const [error, setError] = React.useState(-1)
  const [isFetching, setIsFetching] = React.useState(true)

  function handleOnLog(){
    setIsLogged(!isLogged)
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar isLogged={isLogged} handleOnLog={handleOnLog}/>
          <Routes>
            <Route path= "/" element= {<LandingPage />} />
            <Route path= "/login" element= {<LoginPage isLogged={isLogged} setIsLogged={setIsLogged} loginForm={loginForm} setLoginForm={setLoginForm} error={error} setError={setError}/>} />
            <Route path= "/register" element= {<RegistrationPage isLogged={isLogged} setIsLogged={setIsLogged} registrationForm={registrationForm} setRegistrationForm={setRegistrationForm} error={error} setError={setError}/>} />
            <Route path= "/activity" element= { isLogged ? <ActivityPage isFetching={isFetching} setIsFetching={setIsFetching} isLogged={isLogged}/> : <AccessForbidden />} />
            <Route path= "/nutrition" element= { isLogged ? <NutritionPage /> : <AccessForbidden />} />
          </Routes> 
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

/*
 <Route path= "*" element= {<NotFound />} />*/

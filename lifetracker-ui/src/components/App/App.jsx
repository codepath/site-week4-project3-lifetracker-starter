import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "components/LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import "./App.css"

export default function App() {
  const [loginForm, setLoginForm] = React.useState({ "email" : "", "password" : ""})
  const [isLogged, setIsLogged] = React.useState(false)

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
            <Route path= "/login" element= {<LoginPage isLogged={isLogged} setIsLogged={setIsLogged} loginForm={loginForm} setLoginForm={setLoginForm}/>} />
            <Route path= "/register" element= {<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

/*}
            <Route path= "/activity" element= {<ActivityPage />} />
            <Route path= "/nutrition" element= { loggedIn ? <NutritionPage /> : <AccessForbidden />} />
            <Route path= "*" element= {<NotFound />} />*/

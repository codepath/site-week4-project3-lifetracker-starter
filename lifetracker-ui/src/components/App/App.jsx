import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "components/LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import ActivityPage from "components/ActivityPage/ActivityPage"
import NutritionPage from "components/NutritionPage/NutritionPage"
import NutritionOverview from "components/NutritionOverview/NutritionOverview"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NutritionDetail from "components/NutritionDetail/NutritionDetail"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NotFound from "components/NotFound/NotFound"
import "./App.css"


export default function App() {
  const [loginForm, setLoginForm] = React.useState({ "email" : "", "password" : ""})
  const [registrationForm, setRegistrationForm] = React.useState({ "email" : "", "username" : "", "firstName" : "", "lastName" : "", "password" : "", "passwordConfirm" : ""})
  const [nutritionItems, setNutritionItems] = React.useState([])
  const [isLogged, setIsLogged] = React.useState(false)
  const [error, setError] = React.useState("")
  const [isFetching, setIsFetching] = React.useState(true)
  const [totalCaloriesPerDay, setTotalCaloriesPerDay] = React.useState([])

  function handleOnLog(){
    setIsLogged(!isLogged)
    setNutritionItems([])
    setTotalCaloriesPerDay([])
  }
  console.log(totalCaloriesPerDay)
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar isLogged={isLogged} handleOnLog={handleOnLog}/>
          <Routes>
            <Route path= "/" element= {<LandingPage />} />
            <Route path= "/login" element= {<LoginPage isLogged={isLogged} setIsLogged={setIsLogged} loginForm={loginForm} setLoginForm={setLoginForm} error={error} setError={setError}/>} />
            <Route path= "/register" element= {<RegistrationPage isLogged={isLogged} setIsLogged={setIsLogged} registrationForm={registrationForm} setRegistrationForm={setRegistrationForm} error={error} setError={setError}/>} />
            <Route path= "/activity" element= { isLogged ? <ActivityPage isFetching={isFetching} setIsFetching={setIsFetching} isLogged={isLogged} totalCaloriesPerDay={totalCaloriesPerDay}/> : <AccessForbidden />} />
            <Route path= "/nutrition" element= { isLogged ? <NutritionPage nutritionItems={nutritionItems} setNutritionItems={setNutritionItems}/> : <AccessForbidden />} >
              <Route path="/nutrition/" element={<NutritionOverview nutritionItems={nutritionItems} setNutritionItems={setNutritionItems}/>}></Route>
              <Route path="/nutrition/create" element={<NutritionNew nutritionItems={nutritionItems} setNutritionItems={setNutritionItems} error={error} setError={setError} totalCaloriesPerDay={totalCaloriesPerDay} setTotalCaloriesPerDay={setTotalCaloriesPerDay}/>}></Route>
              <Route path="/nutrition/id/:nutritionId" element={<NutritionDetail nutritionItems={nutritionItems}/>} />
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes> 
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

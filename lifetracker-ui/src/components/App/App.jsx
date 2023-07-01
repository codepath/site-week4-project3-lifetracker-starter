import './App.css'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../LoginPage/LoginPage'
import SleepPage from '../SleepPage/SleepPage'
import NutritionPage from '../NutritionPage/NutritionPage'
import ExercisePage from '../ExercisePage/ExercisePage'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser]= useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // useEffect(()=> {
  //   axios.get('http://localhost:3000').then((response) => {
      
  //   })
  // })

  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
            <Route path='/' element={<Home user={user} isAuthenticated={isAuthenticated} />}/>
            <Route path='/sleep' element={<SleepPage isAuthenticated={isAuthenticated}/>}/>
            <Route path='/nutrition' element={<NutritionPage isAuthenticated={isAuthenticated}/>}/>
            <Route path='/exercise' element={<ExercisePage isAuthenticated={isAuthenticated}/>}/>
            <Route path='/register' element={<RegistrationPage setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>}/>
            <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

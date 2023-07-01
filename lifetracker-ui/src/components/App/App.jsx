import './App.css'
import Navbar from "../Navbar/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../RegistrationForm/RegistrationForm'
import Home from '../Home/Home'
import {useEffect, useState} from "react"

function App() {
  const [user, setUser]= useState('')
  const [loggedin, setloggedin] =useState(false)

  return (
    <div className='main-container'>
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route path="/" element={<Home user={user} loggedin={loggedin}/>} />
          <Route path="/register" element={<Register setUser={setUser} setloggedin={setloggedin}/>} /> 
          {/* <Route path="/nutrition" element={<NutritionPage />} /> */}
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App

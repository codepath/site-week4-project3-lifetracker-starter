import './App.css'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Landing from '../../pages/Landing/Landing'
import RegisterPage from '../../pages/RegistrationPage/RegistrationPage'
import LoginPage from "../../pages/LoginPage/LoginPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
function App() {
  const [appState, setAppState] = useState({})

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/register" element={<RegisterPage setAppState={setAppState}/>}/>
          <Route path="/login" element={<LoginPage setAppState={setAppState}/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

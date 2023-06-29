import './App.css'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from "../Home/Home"
import Landing from '../../pages/Landing/Landing'
import Register from '../../pages/Register/Register'
import Login from "../../pages/Login/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

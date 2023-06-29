import './App.css'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from "../Home/Home"
import Landing from '../Landing/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

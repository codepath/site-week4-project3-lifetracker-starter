import './App.css'
import Navbar from '../Navbar/Navbar'
import Home from "../Home/Home"
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

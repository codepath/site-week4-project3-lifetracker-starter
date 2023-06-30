import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { useState } from 'react'
import Portal from '../Portal/Portal'
import Home from '../Home/Home'

function App() {
  const [appState, setAppState] = useState({})

  return (
    <BrowserRouter>
    <div>

      <Navbar/>

      <Routes>

        <Route 
          path='/'
          element={<Home/>}
        />
        <Route 
          path='/auth/register'
          element={<Register setAppState={setAppState}/>}
        />
        <Route 
          path='/auth/login'
          element={<Login setAppState={setAppState}/>}
        />
        <Route
          path="/portal"
          element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
        />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

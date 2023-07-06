import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode"
import Portal from '../Portal/Portal'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import NutritionPage from '../NutritionPage/NutritionPage'

function App() {
  const [appState, setAppState] = useState({})
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
      // check if user is logged in when user first accesses webpage
      const token = localStorage.getItem("token")
      if (token){
        // decode stored token
        const decodedToken = jwtDecode(token)
        setAppState(decodedToken)


        if (decodedToken.exp * 1000 > Date.now()){
          setLoggedIn(true)
        } else{

        }
      }

  },[])
  

  return (
    <BrowserRouter>
    <div>

      <Navbar user={appState?.user} setAppState={setAppState}/>

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
          element={<Login setAppState={setAppState} appState={appState}/>}
        />
        <Route
          path="/portal"
          element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
        />
        <Route
          path="/activities"
          element={<ActivityPage user={appState?.user} setAppState={setAppState} />}
        />
        <Route
          path="/nutrition"
          element={<NutritionPage user={appState?.user} setAppState={setAppState} />}
        />

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

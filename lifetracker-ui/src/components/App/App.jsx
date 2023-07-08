import './App.css'
import Navbar from "../Navbar/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../RegistrationForm/RegistrationForm'
import Home from '../Home/Home'
import { useEffect, useState } from "react"
import ExercisePage from '../ExercisePage/ExercisePage'
import NutritionPage from '../NutritionPage/NutritionPage'
import ActivityPage from '../ActivityPage/ActivityPage'
import SleepPage from '../SleepPage/SleepPage'
import SignIn from '../SignIn/SignIn'
import apiClient from '../../Services/apiClient'


function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  })

  useEffect(() => {
    const token = localStorage.getItem("life_token")
    apiClient.setToken(token);
    async function fetchUser() {
      if (token) {
        try {
          const { data, error, message } = await apiClient.me();
          console.log(data)
          console.log(error)
          if (error) {
            setAppState((prevState) => ({
              ...prevState,
              isAuthenticated: false
            }));
            localStorage.setItem("life_token", null);
            return;
          }
          setAppState((prevState) => ({
            ...prevState,
            user: data.userInfo,
            isAuthenticated: true,
            sleep: data.sleep
          }));

        } catch (error) {
          console.error(error)

        }
      } else {
        localStorage.setItem("life_token", null)
      }
    }
    fetchUser()
  }, [appState.isAuthenticated])

  const [user, setUser] = useState('')
  const [loggedin, setloggedin] = useState(false)
  console.log(appState)
  return (
    <div className='main-container'>
      <BrowserRouter>
        <Navbar setAppState={setAppState} appState={appState} />
        <Routes>
          <Route path="/" element={<Home user={appState.user} isAuthenticated={appState.isAuthenticated} />} />
          <Route path="/register" element={<Register setAppState={setAppState} appState={appState} />} />
          <Route path="/signin" element={<SignIn setAppState={setAppState} />} />
          <Route path="/exercise" element={<ExercisePage setAppState={setAppState} appState={appState} />} />
          <Route path="/nutrition" element={<NutritionPage setAppState={setAppState} appState={appState} />} />
          <Route path="/activity" element={<ActivityPage setAppState={setAppState} appState={appState} />} />
          <Route path="/sleep" element={<SleepPage setAppState={setAppState} appState={appState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

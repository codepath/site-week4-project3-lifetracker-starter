import { useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import apiClient from "../../../services/apiClient"
import Home from "../Home/Home"
import Navbar from "../Navbar/Navbar"
import Register from "../Register/Register"
import Login from "../Login/Login"
import ActivityPage from "../ActivityPage/ActivityPage"
import ExercisePage from "../ExercisePage/ExercisePage"
import ExerciseForm from "../ExerciseForm/ExerciseForm"
//import Exercise from "../Exercise/Exercise"
import "./App.css"
import SleepPage from "../SleepPage/SleepPage"
import axios from "axios"
import NutritionPage from "../NutritionPage/NutritionPage"
//import NutritionForm from "../Nutrition/NutritionForm"

export default function App() {
  //const [appState, setAppState] = useState({})
  const [appState, setAppState] = useState({});
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  })
  // user: null,
  //   token: null

  const [user, setUser] = useState({})
  const [exercise, setExercise] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(user?.email)
  const [duration, setDuration] = useState (0)
  


  useEffect (() => {
    const fetchUser = async () =>{
      const {data, error} = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
     // setIsAuthenticated(data.user)
      //setIsAuthenticated(true)
      if(error) setError(error)
    }
    const token = localStorage.getItem("lifetracker_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [user])




  useEffect(() => {

    
    
    const fetchExercises = async () => {
      setIsFetching(true)
      setIsAuthenticated(user.email)
      const {data,error} = await apiClient.listAllExercises(user.email)
      console.log()
      if(data) 
      setExercise(data.exercises)
      console.log("Exercise from App.jsx")
      console.log(data)
      if (error) setError(error)

      setIsFetching(false)

      // try {
      //   const res = await axios.get("http://localhost:3005/exercise/")
      //   if (res?.data?.exercises) {
      //     setError(null)
      //     setExercise(res.data.exercises)
      //   }
      // } catch (err) {
      //   console.log(err)
      //   const message = err?.response?.data?.error?.message
      //   setError(message ?? String(err))
      // } finally {
      //   setIsFetching(false)
      // }
    }

    fetchExercises()
  }, [user])


  const addExercise = (newExercise) => {
    setExercise((oldExercise) => [newExercise, ...oldExercise])
  }


 


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exerciseArray, setExerciseArray] = useState([]);
  const [exerciseTime, setExerciseTime] = useState();
  const [exerciseAvg, setExerciseAvg] = useState();



  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setAppState={setAppState} setUser={setUser} isAuthenticated = {isAuthenticated} setIsAuthenticated = {setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} setUser = {setUser} />} />
          <Route path="/login" element={<Login setAppState={setAppState} setUser = {setUser}/>} />
          <Route path="/activity" element={<ActivityPage user={user} setUser = {setUser} isAuthenticated = {isAuthenticated}/>}/>
          <Route path="/exercise" element={<ExercisePage user={user} exercises = {exercise} isFetching = {isFetching} error = {error}  isAuthenticated = {isAuthenticated}/>}/>
          <Route path="/exercise/create" element={<ExerciseForm setAppState={setAppState} appState={appState} user={user} addExercise = {addExercise} setExercise = {setExercise} exercise={exercise} />}/>
          <Route path="/sleep" element={<SleepPage setAppState={setAppState} appState={appState} user={appState?.user}/>}/>
          <Route path="/nutrition" element={<NutritionPage setAppState={setAppState} appState={appState} user={appState?.user} />}/>
          {/* <Route path="/nutrition/create" element={<NutritionForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
  // setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} form={form} setForm={setForm }
}

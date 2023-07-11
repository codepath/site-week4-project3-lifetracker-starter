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
  const [exercises, setExercise] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [duration, setDuration] = useState (0)


  useEffect (() => {
    const fetchUser = async () =>{
      const {data, error} = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if(error) setError(error)
    }
    const token = localStorage.getItem("lifetracker_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])


  useEffect(() => {
  
    const fetchExercises = async () => {
      setIsFetching(true)

      const {data,error} = await apiClient.listExercises(user.email)
      if(data) setExercise(data.exercises)
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

  // const [nutritionArray, setNutritionArray] = useState([]);

  // const [nutritionCalories, setNutritionCalories] = useState();
  // const [nutritionMax, setNutritionMax] = useState();

  // useEffect(() => {
  //   if (appState.user_email) {
  //     axios
  //       .get("https://lifetracker-api-tifu.onrender.com/auth/exercise", {
  //         params: {
  //           user_email: appState.user_email,
  //         },
  //       })
  //       .then((response) => {
  //         const exercises = response.data.exercises;
  //         // const exerciseTime = response.data.exerciseTime;
  //         // const exerciseAvg = response.data.exerciseAvg;
  //         // setExerciseAvg(
  //         //   exerciseAvg === null ? 0.0 : parseFloat(exerciseAvg).toFixed(1)
  //         // );
  //         // setExerciseArray(exercises);
  //         // setExerciseTime(
  //         //   exerciseTime === null ? 0.0 : parseFloat(exerciseTime).toFixed(1)
  //         // );
  //       })
  //       .catch((error) => {
  //         console.log("Error with axios:", error);
  //       });
  //   }
  // }, [appState.user_email]);




  // useEffect(() => {
  //   const checkLoggedIn = () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       // decode stored token
  //       const decodedToken = jwtDecode(token);
  //       setAppState(decodedToken);
  //       // check if token is expired
  //       if (decodedToken.exp * 1000 > Date.now()) {
  //         setIsLoggedIn(true);
  //       } else {
  //         localStorage.removeItem("token");
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar appStateUser={appState.user} setAppState={setAppState}  user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} setUser = {setUser} />} />
          <Route path="/login" element={<Login setAppState={setAppState} setUser = {setUser}/>} />
          <Route path="/activity" element={<ActivityPage user={user} setUser = {setUser}/>}/>
          <Route path="/exercise" element={<ExercisePage user={user} exercises = {exercises} isFetching = {isFetching} error = {error} />}/>
          <Route path="/exercise/create" element={<ExerciseForm setAppState={setAppState} appState={appState} user={user} addExercise = {addExercise} />}/>
          <Route path="/sleep" element={<SleepPage setAppState={setAppState} appState={appState} user={appState?.user}/>}/>
          <Route path="/nutrition" element={<NutritionPage setAppState={setAppState} appState={appState} user={appState?.user} />}/>
          {/* <Route path="/nutrition/create" element={<NutritionForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
  // setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} form={form} setForm={setForm }
}

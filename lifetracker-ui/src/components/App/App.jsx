import './App.css'
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState, useEffect } from 'react'
import ExercisePage from '../ExercisePage/ExcersisePage'
import NutritionPage from '../NutritionPage/NutritionPage'
import SleepPage from '../SleepPage/SleepPage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SleepCreate from '../SleepCreate/SleepCreate'

function App() {
  const [user, setUser] = useState(1)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  

  const handleLogin = async (email, password) => {
    // try {
      let response = await axios.post('http://localhost:3001/auth/login', {email, password })
      console.log("Response output: ", response)
      setUser(response.data)
      setLoggedIn(true)
    // }
    //    catch (error) {
    //  console.error("Error:", error);
     localStorage.setItem('user', response.data)
     console.log(response.data)
    }

    // useEffect(() => {
    //   const loggedInUser = localStorage.getItem("user");
    //   if (loggedInUser) {
    //     const foundUser = JSON.parse(loggedInUser);
    //     setUser(foundUser);
    //   }
    // }, []);
  

    //Registration function to handle registration
    const handleRegistration = async (email, password, first_name, last_name, username) => {
     try {
        console.log("first name value in handleRegsiteration: ", first_name)
        console.log("username value in handleRegsiteration: ", username)
        let response = await axios.post('http://localhost:3001/auth/register', {email, password, first_name, last_name, username})
        console.log("Response output: ", response)
        // setLoggedIn(true)
     } catch (error) {
      console.error(error.response.data);
     }
    };

    const handleSleep = async (startTime, endTime) => {
      try {
        let response = await axios.post('http://localhost:3001/sleep', {startTime, endTime})
        console.log("Response output ", response)
      } catch (error) {
        console.log(error.response.data)
      }
    }

  return (
    <div>
      <Navbar loggedIn = {loggedIn}/>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path="/login" element={<SignIn onLogin = {handleLogin} error = {loginError} />} />
          <Route path = "/register" element= {<Register onRegister = {handleRegistration}/>}/>
          <Route path="/activity" element={<ActivityPage loggedIn = {loggedIn} />}/>
          <Route path = "/exercise" element = {<ExercisePage loggedIn = {loggedIn}/>}/>
          <Route path = "/nutrition" element = {<NutritionPage loggedIn = {loggedIn}/>}/>
          <Route path = "/sleep" element = {<SleepPage loggedIn = {loggedIn}/>}/>
          <Route path = "/sleep/create" element = {<SleepCreate onSleep = {handleSleep}/>}/>
        </Routes>
        </Router>
    </div>

  )
  
}

export default App

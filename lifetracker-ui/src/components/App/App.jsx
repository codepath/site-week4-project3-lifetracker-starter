import './App.css'
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState } from 'react'
import ExercisePage from '../ExercisePage/ExcersisePage'
import NutritionPage from '../NutritionPage/NutritionPage'
import SleepPage from '../SleepPage/SleepPage'
import axios from 'axios'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const handleLogin = async (email, password) => {
   
    try {
      let response = await axios.post('http://localhost:3001/auth/login', { email, password })

      console.log("Response output: ", response)

      if (response.ok) {
        //Successful Login
        setLoggedIn(true);
        setLoginError("");
       // console.log(response); //optional - display a success message
      } else {
        //Login failed
        setLoginError(response);
      //  console.log(response); //optional - display error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

    //Registration function to handle registration
    const handleRegistration = async (name, email, password) => {
     
    //   try {
    //     const response = await fetch("http://localhost:3001/api/auth/register", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ name, email, password }),
    //     });
  
    //     //wait for the response
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       //Registration successful
    //       setLoggedIn(true);
    //       console.log(data.message); //optional - display a success message
    //     } else {
    //       //REgistration failed
    //       console.log(data.message); //optional - display error meesage
    //     }
    //   } catch (error) {
    //     console.error("Error: ", error);
    //   }
    // };
  
    // const handleLogout = () => {
    //   setLoggedIn(false);
    };

  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path="/login" element={<SignIn onLogin = {handleLogin} error = {loginError} />} />
          <Route path = "/register" element= {<Register onRegister = {handleRegistration}/>}/>
          <Route path="/activity" element={<ActivityPage loggedIn = {loggedIn} />}/>
          <Route path = "/exercise" element = {<ExercisePage loggedIn = {loggedIn}/>}/>
          <Route path = "/nutrition" element = {<NutritionPage loggedIn = {loggedIn}/>}/>
          <Route path = "/sleep" element = {<SleepPage loggedIn = {loggedIn}/>}/>
        </Routes>
        </Router>
    </div>

  )
  
}

export default App

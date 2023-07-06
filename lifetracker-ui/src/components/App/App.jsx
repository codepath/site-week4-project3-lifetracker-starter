import './App.css'
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import ExercisePage from '../ExercisePage/ExcersisePage'
import NutritionPage from '../NutritionPage/NutritionPage'
import SleepPage from '../SleepPage/SleepPage'


import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from "jwt-decode"


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userId , setUserId]=useState();



  
  const handleLogin = async (email, password) => {
   
    
      let response = await axios.post('http://localhost:3001/auth/login', {email, password })
      
      if (response.status === 200) {
        // const { token } = response.data;
        const { token } = response.data;
        localStorage.setItem("token", token);

        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(response.data.message); //optional - display a success message
        console.log(response.data.user.id); //another way to get the username

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserId(decodedToken.userId);
        
      } else {
        //Login failed
        setLoginError(response.data.message);
        console.log(response.data.message); //optional - display error message
      }

      console.log("Response output: ", response)

    
  };

    //Registration function to handle registration
    const handleRegistration = async (email, password, first_name, last_name, username) => {
     try {
        console.log("first name value in handleRegsiteration: ", first_name)
        console.log("username value in handleRegsiteration: ", username)
        let response = await axios.post('http://localhost:3001/auth/register', {email, password, first_name, last_name, username})
        console.log("Response output: ", response)
        
        if (response.status === 201) {
        const { token } = response.data
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token); //a way to get userid from token
        setUserId(decodedToken.userId);

        //Registration successful
        setLoggedIn(true);
        console.log(response.data.message);  //optional - display a success message
      }
      else{
        console.log(data.message); 
      }

     } catch (error) {
      console.error(error);
     }
          
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

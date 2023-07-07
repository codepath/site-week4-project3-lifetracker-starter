import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import './App.css'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../LoginPage/LoginPage'
import SleepPage from '../SleepPage/SleepPage'
import NutritionPage from '../NutritionPage/NutritionPage'
import ExercisePage from '../ExercisePage/ExercisePage'
import ActivityPage from '../ActivityPage/ActivityPage'
import ExerciseForm from '../ExercisePage/ExerciseForm/ExerciseForm'
import SleepForm from '../SleepPage/SleepForm/SleepForm'
import NutritionForm from '../NutritionPage/NutritionForm/NutritionForm'

function App() {
  const [user, setUser]= useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [sleep, setSleep] = useState([])
  const [exercise, setExercise] = useState([])
  const [nutrition, setNutrition] = useState([])

  // const [activities,]
  const [activitySummary, setActivitySummary] = useState({
    'Total-Exercise-Minutes': 0.0, 
    'Average-Hours-of-Sleep': 0.0,
    'Average-Daily-Calories': 0.0,
    'More-Stats': ''
  })


  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token); //decode the stored token
        setUser(decodedToken);
        const {email, username, firstname, lastname, password, iat, exp} = decodedToken
        
        axios.post('http://localhost:3000/sleep', {email: email}).then((response) => {
          console.log('hi', response)
           setSleep([...response.data])
          // setSleep(response.data)
        })

        axios.post('http://localhost:3000/nutrition', {email: email}).then((response) => {
          console.log('hello', response)
           setNutrition([...response.data])
          // setSleep(response.data)
        })

        axios.post('http://localhost:3000/exercise', {email: email}).then((response) => {
          console.log('howdy', response)
           setExercise([...response.data])
          // setSleep(response.data)
        })
        // console.log('dt',decodedToken)
        // const email= decodedToken.email
        // console.log('em', email)
        // console.log('greetings and good tidings')
        // axios.post('http://localhost:3000/sleep', {email: email}).then((response) => {
        //   console.log('hi', response.data)
        //   //  setSleep(response)
        //   // setSleep(response.data)
        // })
        

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          handleLogout(); //Token has expired, log out the user
        }
      }
    };

    checkLoggedIn();

   
  }, []);

  async function handleLogin (email, password) {
    try {
      const response = await axios.post('http://localhost:3000/auth/login',{email, password})

      const data = response.data;

      if (response.status === 200) {
        const { token } = data;
        localStorage.setItem("token", token);

        //Successful Login
        setIsAuthenticated(true);
        setLoginError("");

        const decodedToken = jwtDecode(token); //a way to get username from token
        // console.log('dtd',decodedToken)
        setUser(decodedToken);
      } else {
        //Login failed
        setLoginError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleLogout() {
    //remove the stored token and setLoggedIn as false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // successLogin=false

  };


  async function handleRegistration(email,username, firstname, lastname, password) {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {email,username, firstname, lastname, password})    

      if (response.status === 201) {
        //get the token information and store in localStorage
        const { token } = response.data;
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUser(decodedToken);

        //Registration successful
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
        <Routes>
            <Route path='/' element={<Home user={user} isAuthenticated={isAuthenticated} />}/>
            <Route path='/activity' element={<ActivityPage user={user} isAuthenticated={isAuthenticated} activitySummary={activitySummary}/>}/>
            <Route path='/sleep' element={<SleepPage sleep={sleep} setSleep={setSleep} user={user} isAuthenticated={isAuthenticated} activitySummary={activitySummary}/>}/>
            <Route path='/nutrition' element={<NutritionPage user={user} nutrition={nutrition} setNutrition={setNutrition} isAuthenticated={isAuthenticated} setActivitySummary={setActivitySummary}/>}/>
            <Route path='/exercise' element={<ExercisePage exercise={exercise} setExercise={setExercise} user={user} isAuthenticated={isAuthenticated} setActivitySummary={setActivitySummary}/>}/>
            <Route path='/exercise-form' element={<ExerciseForm exercise={exercise} setExercise={setExercise} user={user} isAuthenticated={isAuthenticated} activitySummary={activitySummary}/>}/>
            <Route path='/sleep-form' element={<SleepForm sleep={sleep} setSleep={setSleep} user={user} isAuthenticated={isAuthenticated} setActivitySummary={setActivitySummary}/>}/>
            <Route path='/nutrition-form' element={<NutritionForm user={user} nutrition={nutrition} setNutrition={setNutrition} isAuthenticated={isAuthenticated} activitySummary={activitySummary}/>}/>
            <Route path='/register' element={<RegistrationPage handleRegistration={handleRegistration}/>}/>
            <Route path='/login' element={<LoginPage handleLogin={handleLogin} isAuthenticated= {isAuthenticated}/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

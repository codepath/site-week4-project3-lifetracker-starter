import './App.css'
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import Home from '../Home/Home'
import ActivityPage from '../ActivityPage/ActivityPage'
import ExercisePage from '../ExercisePage/ExercisePage'
import NutritionPage from '../NutritionPage/NutritionPage'
import SleepPage from '../SleepPage/SleepPage'
import SleepCreate from '../SleepCreate/SleepCreate'
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from "jwt-decode"
import CreateExercise from '../CreateExercise/CreateExercise'
import NutritionTable from '../NutritionTable/NutritionTable'



function App() {
  const [userId , setUserId]=useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [firstName, setFirstName] = useState("")


//login, logout stuff 
  useEffect(() => {
    const checkLoggedIn = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const decodedToken = jwtDecode(token)
            console.log("decoded token is:", decodedToken)
            setUserId(decodedToken.userId);

            if (decodedToken.exp * 1000 > Date.now()) {
                setLoggedIn(true)
            } else {
                console.log("should make a loggout function")
            }
        }
    };
    checkLoggedIn();
}, [])

const handleLogout = () => {
  localStorage.removeItem("token");
  setLoggedIn(false);
}


  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        //decode the stored token
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          //Token has expired, log out the user
         // handleLogout();
        }
      }
    };
    checkLoggedIn();
  }, []);


    return (

 <div>
      <Navbar loggedIn = {loggedIn} logout = {handleLogout}/>
      <Router>
        <Routes>
          <Route path = "/" element={<Home loggedIn = {loggedIn} firstName = {firstName}/>}/>
          <Route path="/login" element={<SignIn  userId={userId} setUserId={setUserId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} loginError = {loginError} setLoginError={setLoginError} setFirstName={setFirstName}/>} />
          <Route path = "/register" element= {<Register userId= {userId} setUserId={setUserId} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/activity" element={<ActivityPage loggedIn = {loggedIn} />}/>

          <Route path = "/exercise" element = {<ExercisePage loggedIn = {loggedIn } userId={userId}/>}/>
          <Route path="/exercise/CreateExercise" element={<CreateExercise userId={userId}/>}/> 
          <Route path = "/nutrition" element = {<NutritionPage loggedIn = {loggedIn}/>}/>
          <Route path = "/nutrition/create" element={<NutritionTable/>} />

          <Route path = "/sleep" element = {<SleepPage loggedIn = {loggedIn}/>}/>
          <Route path = "/sleep/create" element = {<SleepCreate user_id = {userId}/>}/>
        </Routes>
        </Router>
    </div>

  )
  
}

export default App
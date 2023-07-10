import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import LoginPage from "../LoginPage/LoginPage";
import SleepPage from "../SleepPage/SleepPage";
import NutritionPage from "../NutritionPage/NutritionPage";
import ExercisePage from "../ExercisePage/ExercisePage";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExerciseForm from "../ExercisePage/ExerciseForm/ExerciseForm";
import SleepForm from "../SleepPage/SleepForm/SleepForm";
import NutritionForm from "../NutritionPage/NutritionForm/NutritionForm";

function App() {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [sleep, setSleep] = useState();
  const [exercise, setExercise] = useState();
  const [nutrition, setNutrition] = useState();

  

  const [totalExercise, setTotalExercise] = useState();
  const [avgSleep, setAvgSleep] = useState();
  const [avgCalories, setAvgCalories] = useState();

  useEffect(() => {
    
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token); //decode the stored token
        setUser(decodedToken);
        const { email, username, firstname, lastname, password, iat, exp } =
          decodedToken;

        axios
          .post("http://localhost:3000/sleep", { email: email })
          .then((response) => {
            setSleep([...response.data]);

            let sumDur = 0;
            for (const sleep of response.data) {
              const start = new Date(sleep.start_time);
              const stop = new Date(sleep.end_time);
              sumDur += (stop.getTime() - start.getTime()) / 1000 / (60 * 60);
            }
            const avg = response.data.length? Math.floor(sumDur / response.data.length) : 0;
            setAvgSleep(()=>avg);

          });

        axios
          .post("http://localhost:3000/nutrition", { email: email })
          .then((response) => {
            setNutrition([...response.data]);
            let sumCalories = 0;
            for (const food of response.data) {
              sumCalories += food.calories;
            }
            const avg = response.data.length ? Math.floor(sumCalories / response.data.length) : 0;
            setAvgCalories(()=>avg);

          });

        axios
          .post("http://localhost:3000/exercise", { email: email })
          .then((response) => {
            setExercise([...response.data]);
            let totalDuration = 0;
            response.data.forEach((session) => {
              totalDuration += session.duration;
            });
            setTotalExercise(totalDuration);

          });
       

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          handleLogout(); //Token has expired, log out the user
        }
      }
    

  },[isAuthenticated]);



  async function handleLogin(email, password) {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        const { token } = data;
        localStorage.setItem("token", token);

        //Successful Login
        setIsAuthenticated(true);
        setLoginError("");

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUser(decodedToken);
      } else {
        //Login failed
        setLoginError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleLogout() {
    //remove the stored token and setLoggedIn as false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAvgCalories(0)
    setAvgSleep(0)
    setTotalExercise(0)
    setSleep([])
    setExercise([])
    setNutrition([])
    setUser({})
  }

  async function handleRegistration(
    email,
    username,
    firstname,
    lastname,
    password
  ) {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        username,
        firstname,
        lastname,
        password,
      });

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
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<Home user={user} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/activity"
            element={
              <ActivityPage
                user={user}
                isAuthenticated={isAuthenticated}
                avgCalories={avgCalories}
                avgSleep={avgSleep}
                totalExercise={totalExercise}
              />
            }
          />
          <Route
            path="/sleep"
            element={
              <SleepPage
                avgSleep={avgSleep}
                setAvgSleep={setAvgSleep}
                sleep={sleep}
                setSleep={setSleep}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/nutrition"
            element={
              <NutritionPage
                avgCalories={avgCalories}
                setAvgCalories= {setAvgCalories}
                user={user}
                nutrition={nutrition}
                setNutrition={setNutrition}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/exercise"
            element={
              <ExercisePage
                totalExercise={totalExercise}
                setTotalExercise={setTotalExercise}
                exercise={exercise}
                setExercise={setExercise}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/exercise-form"
            element={
              <ExerciseForm
                totalExercise={totalExercise}
                setTotalExercise={setTotalExercise}
                exercise={exercise}
                setExercise={setExercise}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/sleep-form"
            element={
              <SleepForm
                avgSleep={avgSleep}
                setAvgSleep={setAvgSleep}
                sleep={sleep}
                setSleep={setSleep}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/nutrition-form"
            element={
              <NutritionForm
                avgCalories={avgCalories}
                setAvgCalories= {setAvgCalories}
                user={user}
                nutrition={nutrition}
                setNutrition={setNutrition}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPage handleRegistration={handleRegistration} />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                handleLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

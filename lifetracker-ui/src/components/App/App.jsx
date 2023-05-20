import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import Home from "../Home/Home"
import Navbar from "../Navbar/Navbar"
import ExercisePage from "../ExercisePage/ExercisePage"
import NutritionPage from "../NutritionPage/NutritionPage"
import SleepPage from "../SleepPage/SleepPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"

import apiClient from "../../services/apiClient"
import appTheme from "../../utils/theme"

import "./App.css"

function calculateSleepData({ years, days, hours, minutes }) {
  let total = 0
  if (years) {
    total += 365 * 24 * years
  }
  if (days) {
    total += 24 * days
  }
  if (hours) {
    total += hours
  }
  if (minutes) {
    total += minutes / 60
  }

  return total
}

export default function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  })

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("lifetracker_token")
      apiClient.setToken(token)
      const { data } = await apiClient.fetchUser()
      if (data) {
        setAppState((s) => ({
          ...s,
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          exercises: data.exercises,
          nutrition: data.nutrition,
          averageExerciseIntensity: data.averageExerciseIntensity?.avg || 0,
          averageDailyCalories: data.caloriesSummaryStats?.[0]?.avgCalories || 0,
          maxCaloriesInOneMeal: data.caloriesSummaryStats?.[0]?.maxCalories || 0,
          averageHoursSleep: calculateSleepData({
            years: data.averageHoursSleep?.avg?.years,
            days: data.averageHoursSleep?.avg?.days,
            hours: data.averageHoursSleep?.avg?.hours,
            minutes: data.averageHoursSleep?.avg?.minutes,
          }),
          totalHoursSlept: calculateSleepData({
            years: data.totalHoursSlept?.sum?.years,
            days: data.totalHoursSlept?.sum?.days,
            hours: data.totalHoursSlept?.sum?.hours,
            minutes: data.totalHoursSlept?.sum?.minutes,
          }),
          totalExerciseMinutes: data.totalExerciseMinutes?.sum || 0,
          sleep: data.sleep,
        }))
      }
    }

    fetchUser()
  }, [appState.isAuthenticated])

  return (
    <ChakraProvider theme={appTheme}>
      <CSSReset />
      <div className="App">
        <BrowserRouter>
          <Navbar appState={appState} setAppState={setAppState} />
          <Routes>
            <Route path="/" element={<Home appState={appState} />} />
            <Route path="/exercise/*" element={<ExercisePage appState={appState} setAppState={setAppState} />} />
            <Route path="/sleep/*" element={<SleepPage appState={appState} setAppState={setAppState} />} />
            <Route path="/nutrition/*" element={<NutritionPage appState={appState} setAppState={setAppState} />} />
            <Route path="/activity" element={<ActivityPage appState={appState} setAppState={setAppState} />} />
            <Route path="/register" element={<RegistrationPage appState={appState} setAppState={setAppState} />} />
            <Route path="/login" element={<LoginPage appState={appState} setAppState={setAppState} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

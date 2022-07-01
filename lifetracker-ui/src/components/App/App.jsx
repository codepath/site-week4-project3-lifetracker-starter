import * as React from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  Navigate,
  useResolvedPath
} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import "./App.css";
import Navbar from "components/Navbar/Navbar";
import LandingPage from "components/LandingPage/LandingPage";
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import NutritionPage from "components/NutritionPage/NutritionPage";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}

function App() {
  //state of logged in?
  const {user, setUser, error, setError} = useAuthContext();
  //const [loggedIn, setLoggedIn] = useState(false);
  //const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const {data, err} = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (err) setError(err)
    }

    const token = localStorage.getItem("lifetracker_token");
    if(token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  useEffect(() => {
    //video 9/10 rate my setup for fetching the info
  }, []);


  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar loggedIn={user.email ? true : false}/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={user.email ? <Navigate to="/activity"/> : <LoginPage setUser={setUser}/>}/>
            <Route path="/register" element={user.email ? <Navigate to="/activity"/> : <RegistrationPage/>}/>
            <Route path="/activity" element={!user.email ? <AccessForbidden/> : <div>activity page</div>}/>
            <Route path="/nutrition/*" element={!user.email ? <AccessForbidden/> : <NutritionPage/>}/>
            
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

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

export default function App() {
  //state of logged in?
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar loggedIn={loggedIn}/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={loggedIn ? <Navigate to="/activity"/> : <LoginPage loggedIn={loggedIn}/>}/>
            <Route path="/register" element={loggedIn ? <Navigate to="/activity"/> : <RegistrationPage loggedIn={loggedIn}/>}/>
            <Route path="/activity" element={!loggedIn ? <AccessForbidden/> : <div>activity page</div>}/>
            <Route path="/nutrition" element={!loggedIn ? <AccessForbidden/> : <div>Nutrition</div>}/>
            <Route path="/nutrition/create" element={!loggedIn ? <AccessForbidden/> : <div>Nutrition Form</div>}/>
            <Route path="/nutrition/id/:nutritionId" element={!loggedIn ? <AccessForbidden/> : <div>Nutrition Detail</div>}/>
            <Route path="nutrition/*" element={<NotFound/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

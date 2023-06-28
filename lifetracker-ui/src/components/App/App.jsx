import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";


function App() {
  const [appState, setAppState] = useState({user: {}, isAuthenticated: false, nutrition: {}, sleep: false, exercise: {}}); 
  return (
    <Fragment>
    <Navbar/>
    <Home />
    </Fragment>
  );
}

export default App;

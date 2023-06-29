import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: {},
    sleep: {},
    exercise: {},
  });

  console.log(appState.isAuthenticated, appState.user)
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAppState={setAppState}/>} />
          <Route path="/register" element={<Register setAppState={setAppState}/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

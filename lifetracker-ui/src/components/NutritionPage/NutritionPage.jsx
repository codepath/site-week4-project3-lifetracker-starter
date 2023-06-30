import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";

import "./NutritionPage.css";

export default function NutritionPage( { setAppState, appState } ){
    return (
        <>
        <Navbar appState={appState} setAppState={setAppState}/>
        {appState.isAuthenticated ? null : <p  className="nav-auth">Log in to see your data.</p>}
        </>
    )
}
import React, { Fragment } from "react";

import "./NutritionPage.css";

export default function NutritionPage({ appState }) {
  return (
    <>
      {appState.isAuthenticated ? null : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

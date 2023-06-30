import React, { Fragment } from "react";

import "./ExercisePage.css";

export default function ExercisePage({ appState }) {
  return (
    <>
      {appState.isAuthenticated ? null : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

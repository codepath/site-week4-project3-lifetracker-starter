import React, { Fragment } from "react";

import "./SleepPage.css";

export default function SleepPage({ appState }) {
  return (
    <>
      {appState.isAuthenticated ? null : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

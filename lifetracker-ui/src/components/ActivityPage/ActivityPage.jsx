import React, { Fragment } from "react";

import "./ActivityPage.css";

export default function ActivityPage({ appState }) {
  return (
    <>
      {appState.isAuthenticated ? null : (
        <p className="nav-auth">Log in to see your data.</p>
      )}
    </>
  );
}

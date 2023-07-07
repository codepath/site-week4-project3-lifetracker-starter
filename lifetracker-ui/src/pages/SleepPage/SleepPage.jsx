import "./SleepPage.css";
import { Routes, Route } from "react-router-dom";
export default function SleepPage({ appState, setAppState }) {
  if (appState.user) {
    return <div className="sleep-page"></div>;
  } else {
    return (
      <div className="sleep-page">
        <h1>Please Log in/Sign Up to get Authorization for this Page</h1>
      </div>
    );
  }
}

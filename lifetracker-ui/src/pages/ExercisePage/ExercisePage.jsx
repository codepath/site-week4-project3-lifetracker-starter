import "./ExercisePage.css";
import { Routes, Route } from "react-router-dom";

export default function ExercisePage({ appState, setAppState }) {
  if (appState.user) {
    return <div className="exercise-page"></div>;
  } else {
    return (
      <div className="exercise-page">
        <h1>Please Log in/Sign Up to get Authorization for this Page</h1>
      </div>
    );
  }
}

import "./ExercisePage.css";
import Loading from "../Loading/Loading";
import ExerciseNew from "../ExercisePage/ExerciseNew";
import { useState } from "react";

export default function ExercisePage() {
  const [newExercise, setNewExercise] = useState(false);
  const handleNewExerciseOnClick = () => {
    setNewExercise(true);
  };
  return (
    <div className="exercise-page">
      <div className="banner">
        <h1>Exercise Page</h1>
      </div>
      <div className="content">
        {newExercise ? (
          <ExerciseNew setNewExercise={setNewExercise} />
        ) : (
          <>
            <ExerciseOverview handleOnClick={handleNewExerciseOnClick} />
            <ExerciseFeed />
          </>
        )}
      </div>
    </div>
  );
}

export function ExerciseOverview({ handleOnClick }) {
  return (
    <div className="exercise-overview">
      <div className="header">
        <h3>Overview</h3>
        <button onClick={handleOnClick}>Record Exercise</button>
      </div>
    </div>
  );
}

export function ExerciseFeed({ activities }) {
  return (
    <div className="exercise-feed">
      {activities ? (
        activities.map(<ExerciseCard />)
      ) : (
        <h1 className="empty-message">Nothing here yet</h1>
      )}
    </div>
  );
}

import SleepForm from "../../components/Sleep/SleepForm/SleepForm";
import SleepOverview from "../../components/Sleep/SleepOverview/SleepOverview";
import "./SleepPage.css";
import { Routes, Route } from "react-router-dom";
export default function SleepPage({ appState, setAppState }) {
  if (appState.user) {
    return (
      <div className="sleep-page">
        <Routes>
          <Route
            path=""
            element={
              <SleepOverview
                setAppState={setAppState}
                appState={appState}
              />
            }
          />
          <Route
            path="create"
            element={
              <SleepForm setAppState={setAppState} appState={appState} />
            }
          />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="sleep-page">
        <h1>Please Log in/Sign Up to get Authorization for this Page</h1>
      </div>
    );
  }
}

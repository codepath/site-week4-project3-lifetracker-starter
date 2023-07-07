import { Link } from "react-router-dom";
import SleepFeed from "../SleepFeed/SleepFeed";
import "./SleepOverview.css";

export default function SleepOverview({ setAppState, appState }) {
  return (
    <div className="sleep-overview">
      <div className="header">
        <h3>Sleep Overview</h3>
      </div>

      <div className="log-sleep">
        <Link to="create">
          <span>Log Sleep</span>
        </Link>
      </div>
      <SleepFeed setAppState={setAppState} appState={appState} />
    </div>
  );
}

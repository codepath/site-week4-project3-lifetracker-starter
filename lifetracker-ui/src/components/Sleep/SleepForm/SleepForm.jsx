import { useState } from "react";
import "./SleepForm.css";

export default function SleepForm({ setAppState, appState }) {
  const [sleepForm, setSleepForm] = useState({
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setSleepForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function logSleep() {
    
  }
  return (
    <div className="sleep-form">
      <h1>Log Sleep</h1>
      <div className="sleep-input-form">
        <form className="card">
          <label htmlFor="startTime">Start Time</label>
          <input
            id="startTime"
            className="form-input"
            type="datetime-local"
            name="Start Time"
            value={sleepForm.startTime}
            onChange={handleChange}
            required
          />
          <label htmlFor="startTime">End Time</label>
          <input
            id="endTime"
            className="form-input"
            type="datetime-local"
            name="End Time"
            value={sleepForm.startTime}
            onChange={handleChange}
            required
          />

          <button
            className="submit-registration"
            disabled={isLoading}
            // onClick={logSleep}
          >
            {isLoading ? "Loading... " : "Log Sleep"}
          </button>
        </form>
      </div>
    </div>
  );
}

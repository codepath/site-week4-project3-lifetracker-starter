import { useState } from "react";
import "./SleepForm.css";
import apiClient from "../../../../services/apiClient";

export default function SleepForm({ setAppState, appState }) {
  const [sleepForm, setSleepForm] = useState({
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setSleepForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function logSleep(c) {
    const endTimeDate = new Date(sleepForm.endTime).toLocaleString()
    const startTimeDate = new Date(sleepForm.startTime).toLocaleString()
    c.preventDefault();
    setErrors((e) => ({ ...e, nutritionForm: null }));
    setIsLoading(true);
    const { data, error } = await apiClient.logSleep({
      startTime: startTimeDate,
      endTime: endTimeDate
    });
    if (error) setErrors((e) => ({ ...e, regForm: error }));
    if (data?.newSleep) {
        console.log(data.newSleep)
      setAppState({ ...appState, sleep: [...appState.sleep, data.newSleep] });
      navigate("/sleep");
    }

    setIsLoading(false);

    setSleepForm({
      startTime: "",
      endTime: "",
    });
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
            name="startTime"
            value={sleepForm.startTime}
            onChange={handleChange}
            required
          />
          <label htmlFor="startTime">End Time</label>
          <input
            id="endTime"
            className="form-input"
            type="datetime-local"
            name="endTime"
            value={sleepForm.endTime}
            onChange={handleChange}
            required
          />

          <button
            className="submit-registration"
            disabled={isLoading}
            onClick={logSleep}
          >
            {isLoading ? "Loading... " : "Log Sleep"}
          </button>
        </form>
      </div>
    </div>
  );
}

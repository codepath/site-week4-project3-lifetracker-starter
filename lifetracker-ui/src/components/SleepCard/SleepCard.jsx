import "./SleepCard.css"
export default function SleepCard({ sleepItem }) {
    const startDateTime = new Date(sleepItem.starttime);
    const endDateTime = new Date(sleepItem.endtime);
  
    const startTime = startDateTime.toLocaleTimeString([], { timeStyle: 'short' });
    const endTime = endDateTime.toLocaleTimeString([], { timeStyle: 'short' });
  
    const timeAsleep = Math.abs(endDateTime - startDateTime) / 36e5; // Calculate duration in hours
  
    return (
      <div className="sleep-card">
        <div className="image-container">
          <img className="sleep-image" src="src/assets/moonandstars.jpeg" alt="moon and stars" />
        </div>
        <div className="sleep-content">
          <div>
            <h3>Went to bed 🛌:</h3>
            <p>{startTime}, {startDateTime.toDateString()}</p>
          </div>
          <div>
            <h3>Woke up 🌅:</h3>
            <p>{endTime}, {endDateTime.toDateString()}</p>
          </div>
          <div>
            <h3>Time Asleep:</h3>
            <p>{timeAsleep.toFixed(2)} hours</p>
          </div>
        </div>
      </div>
    );
  }
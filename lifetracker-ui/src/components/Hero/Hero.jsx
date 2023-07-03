import "./Hero.css";
import tracker from "../../assets/tracker.jpg";
export default function Hero() {
  return (
    <div className="hero">
      <div className="cta">
        <h1>LifeTracker</h1>
        <p>
          Helps you keep track of all your productivity and take back your life!
        </p>
      </div>
      <img
        src={tracker}
        alt="Picture of an apple watch which is tracking fitness"
      />
    </div>
  );
}

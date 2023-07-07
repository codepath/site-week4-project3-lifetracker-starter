import "./Landing.css";
import Hero from "../../components/Hero/Hero";
import athlete from "../../assets/athlete.jpg";
import food from "../../assets/food.jpg";
import alarm from "../../assets/alarm.jpg";
import planner from "../../assets/calendar.jpg";
export default function Landing() {
  return (
    <div className="landing-page">
      <Hero />
      <div className="landing-feed">
        <div className="landing-cards">
          <div className="card">
            <h2>Fitness</h2>
            <div className="img">
              <img src={athlete} />
            </div>
          </div>
          <div className="card">
            <h2>Food</h2>
            <div className="img">
              <img src={food} />
            </div>
          </div>
          <div className="card">
            <h2>Rest</h2>
            <div className="img">
              <img src={alarm} />
            </div>
          </div>
          <div className="card">
            <h2>Planner</h2>
            <div className="img">
              <img src={planner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

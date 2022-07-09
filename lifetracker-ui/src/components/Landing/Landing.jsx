import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="hero">
        <img src="../media/herowatch.jpg" alt="" />
        <h1> Life Tracker</h1>
        <p>Helping you take back control of your whole world</p>
      </div>
      <div className="tiles">
        <div className="tile">
          <img src="../media/fitnessicon.png" alt="" />
          <p>Fitness</p>
        </div>
        <div className="tile">
          <img src="../media/foodicon.png" alt="" />
          <p>Food</p>
        </div>
        <div className="tile">
          <img src="../media/resticon.png" alt="" />
          <p>Rest</p>
        </div>
        <div className="tile">
          <img src="../media/plannericon.png" alt="" />
          <p>Planner</p>
        </div>
      </div>
    </div>
  );
}

import ImageContainer from "./ImageContainer/ImageContainer";
import '../Home/Home.css'
import { Link } from "react-router-dom";
import Titles from "./Titles/Titles";

export default function Home({ setAppState }) {
  return (
    <>
        <div className="lifetracker-content">
          <h1 className="lifetracker-heading">LifeTracker</h1>
          <h2 className="lifetracker-subheading">
            Helping you take back control of your world.
          </h2>
          <Link to="/auth/register">
          <a className="lifetracker-button">
            Create your account now
          </a>
          </Link>
        </div>
        
        <ImageContainer/>

        <Titles/>

    </>
  );
}

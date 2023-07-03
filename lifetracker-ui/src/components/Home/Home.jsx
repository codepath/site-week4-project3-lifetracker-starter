import ImageContainer from "./ImageContainer/ImageContainer";
import '../Home/Home.css'
import { Link } from "react-router-dom";
import Titles from "./Titles/Titles";

export default function Home({ setAppState }) {
  return (
    <>
        <div class="lifetracker-content">
          <h1 class="lifetracker-heading">LifeTracker</h1>
          <h2 class="lifetracker-subheading">
            Helping you take back control of your world.
          </h2>
          <Link to="/auth/register">
          <a class="lifetracker-button">
            Create your account now
          </a>
          </Link>
        </div>
        
        <ImageContainer/>

        <Titles/>

    </>
  );
}

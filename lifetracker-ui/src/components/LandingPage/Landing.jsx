import * as React from "react"
import "../LandingPage/Landing.css"

export default function Landing() {
  return (
    <div className="landing-page">
        <div className="hero">
            <img src="https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/How%20to%20Increase%20Productivity%20Without%20Increasing%20Stress_Open%20Graph%20Image.png" className="hero-img" />
            
            <div className="landing-text">
                <h1 className="title">Life Tracker</h1>
                <p className="cta"> Helping you take back control of your world </p>
                <div className="icon-row">
                      <img src="../src/fitness.png" className="icons"/>
                      <img src="../src/food.png" className="icons"/>
                      <img src="../src/rest.png" className="icons"/>
                      <img src="../src/planner.png" className="icons"/>
                </div>
            </div>
        </div>
    </div>
  )
}
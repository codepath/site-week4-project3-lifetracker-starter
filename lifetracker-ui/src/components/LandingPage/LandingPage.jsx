import * as React from "react"
import heroimg from "../../assets/heroimg.svg"
import "./LandingPage.css"

export default function LandingPage() {
    return (
      <div className="landing-page">
        <div className="hero">
            <img className="hero-img" src={heroimg} alt="Hero"></img>
            <h1>Life Tracker</h1>
            <p className="cta">Helping you take back control of your world</p>
        </div>
      </div>
    )
  }


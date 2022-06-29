import * as React from "react"
import "./Landing.css"

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="hero">
        <img className="hero-img" src="https://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" alt="" />
        <div className="cta">
          <h2>Life Tracker</h2>
          <h3>Helping you take back control of your world</h3>
        </div>
      </div>
    </div>
  )
}

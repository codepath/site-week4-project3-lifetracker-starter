import * as React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="lp-content">
        <div className="hero">
          <img
            className="hero-img"
            src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"
          />
          <h1 className="hero-title">Life Tracker</h1>
          <p className="cta">Helping you take back control of your world</p>
        </div>
      </div>
    </div>
  );
}

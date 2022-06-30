import * as React from "react"
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="hero">
                {/* <div className="hero-img"> */}
                    <img className="hero-img" src="./media/smartwatch-screen-digital-device.svg" alt="hero-img"/>
                {/* </div> */}
                <div className="cta">
                    <h1 className="header">LifeTracker</h1>
                    <p>Helping you take back control of your world</p>
                </div>
            </div>
        </div>
    )
}
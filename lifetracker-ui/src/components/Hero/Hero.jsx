import * as React from "react"
import "./Hero.css"

export default function Hero() {
  return (
    <div className="Hero">
      <div className="hero-body">
        <div className="chakra-stack hero-headings">
          <h1 className="chakra-heading h1-heading">LifeTracker</h1>
          <h2 className="chakra-heading h2-heading">Helping you take back control of your world.</h2>
        </div>
        <div className="hero-image"><img src="https://www.apple.com/v/apple-watch-se/k/images/overview/hero/hero__w8w7dclctnmi_large.jpg" className="chakra-image css-incex5" /></div>
      </div>

    </div>
  )
}
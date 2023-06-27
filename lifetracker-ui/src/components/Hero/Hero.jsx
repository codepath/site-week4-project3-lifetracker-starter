import * as React from "react"
import "./Hero.css"

export default function Hero() {
  return (
    <div className="Hero">
      <div className="hero-content">
        <div className="hero-paragraphs">
          <h2>Welcome!</h2>
          <h2>Find Your Merch!</h2>
          <h6>We have all kinds of goodies. Click on any of the items to start filling up your shopping cart. Checkout whenever you're ready.</h6>


        </div>
        <div className="hero-image">

          <img src="https://codepath-student-store-demo.surge.sh/assets/student_store_icon.18e5d61a.svg" alt="hero" className="hero-img" />
        </div>



      </div>

    </div>
  )
}
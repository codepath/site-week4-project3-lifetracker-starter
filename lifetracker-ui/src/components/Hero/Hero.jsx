import *as React from "react"
import "./Hero.css"

export default function Hero({loggedin, user}) {
    return (
        <div className="banner">
            <div className="media">
                <div className="banner_left">
                    {loggedin ?( <h1> Welcome to the other side {user}! </h1>):( <h1> LifeTracker </h1>)}
                    <h3> Helping you take back control of your world!</h3>
                </div>
                <div className="media">
                    {<img src="https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg" alt="banner" className="banner-img" width="500" height="400" ></img>}
                </div>
            </div>

        </div>
    )
}
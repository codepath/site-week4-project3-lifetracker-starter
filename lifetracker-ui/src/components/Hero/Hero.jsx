import *as React from "react"
import "./Hero.css"

export default function Hero({loggedin, user}) {
    console.log(user)
    return (
        <div className="banner">
            <div className="media">
                <div className="banner_left">
                    {loggedin ?( <h1> Welcome to the other side {user.email}! </h1>):( <h1> LifeTracker </h1>)}
                    <h3> Helping you take control of your world!</h3>
                </div>
                <div className="media">
                    {<img src="https://i.pinimg.com/originals/c2/60/6d/c2606d0b0faa37cb69f6f894257a6b26.jpg" alt="banner" className="banner-img" width="500" height="400" ></img>}
                </div>
            </div>

        </div>
    )
}
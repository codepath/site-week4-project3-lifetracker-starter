import React from "react"
import './FeedTiles.css'

export default function FeedTiles() {
    return (
        <div className="mediatiles">
            <div>
                <h2> Fitness </h2>
                {<img src="https://cdn.runningshoesguru.com/wp-content/uploads/2022/01/andrew-heald-VH3Km06Owio-unsplash-scaled.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Food </h2>
                {<img src="https://roladinrestaurant.com/wp-content/uploads/2017/02/25-Recipes-for-When-You-Dont-Feel-Like-Cooking.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Rest </h2>
                {<img src="https://caps.unc.edu/wp-content/uploads/2021/10/mpho-mojapelo-I84vGUYGUtQ-unsplash-scaled-1-768x512.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Planner </h2>
                {<img src="https://www.sanfranciscofcu.com/wp-content/uploads/2021/06/calendar-350x350-1.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>

        </div>
    )
}
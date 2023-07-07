import React from "react"
import './FeedTiles.css'

export default function FeedTiles() {
    return (
        <div className="mediatiles">
            <div>
                <h2> Fitness </h2>
                {<img src="https://img.freepik.com/free-photo/athletic-woman-gym-outfit-doing-crunches_23-2148398852.jpg?w=2000&t=st=1688600524~exp=1688601124~hmac=580207393f59b3fc832eebcf23eea9ee82df4e34eeac03abc02b7906bd337cbc" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Food </h2>
                {<img src="https://abraskitchen.com/wp-content/uploads/Pink-Protein-Pancakes-1.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Rest </h2>
                {<img src="https://i0.wp.com/www.theotheraesthetic.com/wp-content/uploads/2022/07/Pink-and-White-Mini-Round-Alarm-Clocks-1.jpeg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>
            <div>
                <h2> Planner </h2>
                {<img src="https://i.etsystatic.com/39541852/r/il/6d4b3c/4492561436/il_1588xN.4492561436_l1gf.jpg" alt="" className="tile-img" width="250" height="250" ></img>}
            </div>

        </div>
    )
}
import "./Home.css"
import tracker from "../../assets/tracker.jpg"
import fitness from "../../assets/athlete.jpg"
import food from "../../assets/food.jpg"
import rest from "../../assets/alarm.jpg"
import planner from "../../assets/calendar.jpg"


function Home (){
    return(
        <div className = "landing">
            <div className = "main">
                <div className="blurb">
                    <h1 className="title">LifeTracker</h1>
                    <h2 className="message">Helping you take back control of your world.</h2>
                </div>
                <div className="blurb-picture">
                    <img src = {tracker} />
                </div>
            </div>
            <div className="tiles">
                <div spacing = "10px" className = "Fitness">
                    <div className="tile-title">
                        <p>Fitness</p>
                    </div>
                    <div className="tile-photo">
                        <img src = {fitness} alt ="woman running"/>
                    </div>
                </div>
                <div spacing = "10px" className = "Food">
                    <div className="tile-title">
                        <p>Food</p>
                    </div>
                    <div className="tile-photo">
                        <img src = {food} alt ="food on chopping board"/>
                    </div>
                </div>
                <div spacing = "10px" className = "Rest">
                    <div className="tile-title">
                        <p>Rest</p>
                    </div>
                    <div className="tile-photo">
                        <img src = {rest} alt ="food on chopping board"/>
                    </div>
                </div>
                <div spacing = "10px" className = "Planner">
                    <div className="tile-title">
                        <p>Planner</p>
                    </div>
                    <div className="tile-photo">
                        <img src = {planner} alt ="food on chopping board"/>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home
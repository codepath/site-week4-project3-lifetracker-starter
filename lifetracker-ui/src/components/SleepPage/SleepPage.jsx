import "./SleepPage.css"
//import SleepTiles from "../SleepTiles/SleepTiles"

function SleepPage(){
    return (
        <div className="exercise-page">
            <div className="content">
                <div className="title">
                    <h2 className="s-heading">
                        Sleep
                    </h2>
                </div>
                <div className="s-btn">
                    <button>
                        Record Sleep
                    </button>
                </div>
                <div className="s-tiles">
                    {/* <SleepTiles/> */}
                </div>
            </div>
        </div>
    )
}

export default SleepPage
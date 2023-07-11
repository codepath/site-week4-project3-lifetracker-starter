import "./NutritionPage.css"
//import NutritionTiles from "../NutritionTiles/NutritionTiles"

function NutritionPage(){
    return (
        <div className="nutrition-page">
            <div className="content">
                <div className="title">
                    <h2 className="n-heading">
                        Nutrition
                    </h2>
                </div>
                <div className="n-btn">
                    <button>
                        Record Nutrition 
                    </button>
                </div>
                <div className="n-tiles">
                    {/* <NutritionTiles/> */}
                </div>
            </div>
        </div>
    )
}

export default NutritionPage
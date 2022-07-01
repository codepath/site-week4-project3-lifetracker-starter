import * as React from "react"
import { Link } from "react-router-dom"
import NutritionCard from "components/NutritionCard/NutritionCard";
import "./NutritionOverview.css"

export default function NutritionOverview(props) {
    console.log(props.nutritionItems);
    return (
        <div className="nutrition-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="/nutrition/create"><button className="Button outline small outline aqua">Record Nutrition</button></Link>
            </div>
            <div className="feed">
                {props.nutritionItems.map((item) => (<NutritionCard name={item.name} calories={item.calories} image={item.imageUrl} category={item.category} quantity={item.quantity} time={item.time}/>))}
            </div>
        </div>
    )
  }

import NutritionCard from "components/NutritionCard/NutritionCard"
import * as React from "react"
import "./NutritionFeed.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function NutritionFeed(props) {
    let [nutrition, setNutrition] = useState([])
    let [error, setError] = useState() 

    async function getNutrition(){
        try{
            let json = await axios.get('http://localhost:3001/nutrition/')
            console.log(json)
            setNutrition(json.data.nutrition)
          }
        catch(err){
          setError(err)
        }
      }

  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-feed">
        {nutrition.length ? null : (<p className="empty-message">Nothing here yet..</p>)}
        {nutrition.map((item) => {return(
            <Link to={`id/`+item.id}>
                <NutritionCard key={item.name} name={item.name} calories={item.calories} imageUrl={item.image_url} category={item.category} createdAt={item.created_at} id={item.id}/>
            </Link>
        )})}
    </div>
  )
}
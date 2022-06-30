import * as React from "react"
import { useParams } from "react-router-dom"
import NotFound from "components/NotFound/NotFound"
import NutritionCard from "components/NutritionCard/NutritionCard"
import axios from "axios"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"

export default function NutritionDetail(props) {
    const [nutrition, setNutrition] = useState({})
    const [notFound, setNotFound] = useState(false)
    const {nutritionId} = useParams()

    async function getNutrition(){
        try{
            let json = await axios.get('http://localhost:3001/nutrition/id/'+nutritionId)
            setNutrition(json.data.nutrition)
            console.log(nutritionId, json.data)
          }
        catch(err){
          console.log(err)
          setNotFound(true)
        }
      }
  
  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-detail">
        {notFound ? (<NotFound/>) : <NutritionCard id={nutrition.id} key={nutrition.name} name={nutrition.name} calories={nutrition.calories} imageUrl={nutrition.image_url} category={nutrition.category} createdAt={nutrition.created_at}/>}
    </div>
  )
}
import * as React from "react"
import { useParams } from "react-router-dom"
import NotFound from "components/NotFound/NotFound"
import NutritionCard from "components/NutritionCard/NutritionCard"
import API from "../../services/apiClient"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"

export default function NutritionDetail(props) {
    const [nutrition, setNutrition] = useState({})
    const [notFound, setNotFound] = useState(false)
    const {nutritionId} = useParams()

    async function getNutrition(){
      const {data, err} = await API.fetchNutritionById(nutritionId)
      if(err) setError(err)
      if(data){
        console.log(data)
        setNutrition(data.nutrition)
      }
        // try{
        //     let json = await axios.get('http://localhost:3001/nutrition/id/'+nutritionId)
        //     setNutrition(json.data.nutrition)
        //     console.log(nutritionId, json.data)
        //   }
        // catch(err){
        //   console.log(err)
        //   setNotFound(true)
        // }
      }
  
  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-detail">
        {notFound ? (<NotFound/>) : <NutritionCard quantity={nutrition.quantity} id={nutrition.id} key={nutrition.name} name={nutrition.name} calories={nutrition.calories} imageUrl={nutrition.imageUrl} category={nutrition.category} createdAt={nutrition.createdAt}/>}
    </div>
  )
}
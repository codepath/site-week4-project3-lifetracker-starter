import NutritionCard from "components/NutritionCard/NutritionCard"
import * as React from "react"
import "./NutritionFeed.css"
import API from "../../services/apiClient"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function NutritionFeed(props) {
    let [nutrition, setNutrition] = useState([])
    let [error, setError] = useState() 

    async function getNutrition(){
      const {data, err} = await API.fetchNutrition()
      if(err) setError(err)
      if(data){
        console.log(data)
        setNutrition(data.nutrition)
      }
      //   try{
      //       let json = await axios.get('http://localhost:3001/nutrition/')
      //       console.log(json)
      //       setNutrition(json.data.nutrition)
      //     }
      //   catch(err){
      //     setError(err)
      //   }
      }

  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-feed">
        {nutrition.length ? null : (<p className="empty-message">Nothing here yet..</p>)}
        {nutrition.map((item) => {return(
            <Link to={`id/`+item.id}>
                <NutritionCard key={item.name} quantity={item.quantity} name={item.name} calories={item.calories} imageUrl={item.imageUrl} category={item.category} createdAt={item.createdAt} id={item.id}/>
            </Link>
        )})}
    </div>
  )
}
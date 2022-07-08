import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import * as React from "react"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"
import { useNutritionContext } from "../../contexts/nutrition"
import Loading from "components/Loading/Loading"
import { useState } from "react"

export default function NutritionOverview() {
  const {nutritions, isLoading, error} = useNutritionContext()
  const [copy, setCopy] = useState([...nutritions])
  console.log(nutritions)

  const handleFilter = (event) => {
    if(event.target.value == "less"){
      setCopy(nutritions.filter(item =>  item.calories < 100))
    }
    else if(event.target.value == "more"){
      setCopy(nutritions.filter(item =>  item.calories > 500))
    }
    else if(event.target.value == "all"){
      setCopy(nutritions)
    }
    else{
      setCopy(nutritions.filter(item => item.calories >= 100 && item.calories <= 500))
    }
    console.log(copy)
  }

  return (
    <div className="nutrition-overview">
        <h1>Overview</h1>
        {error? <p className="error">{error}</p> : null}
        <Link to="/nutrition/create"><button id="record">Record Nutrition</button></Link>
        <select name="filter-nutrition" id="filter-nutrition" onChange={(e)=>handleFilter(e)}>
          <option value="" disabled selected>Filter by calories</option>
          <option value="all">Show all</option>
          <option value="less">Less than 100</option>
          <option value="mid">100 ~ 500</option>
          <option value="more">More than 500</option>
        </select>
        
        {isLoading? <Loading/> : <NutritionFeed nutritions={copy}></NutritionFeed>}
    </div>
  )
}
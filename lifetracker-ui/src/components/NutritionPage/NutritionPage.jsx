import './NutritionPage.css'
import React from "react"
import axios from 'axios'
import {useState, useEffect} from "react"

export default function NutritionPage({loggedIn}) {

  const [nutritionData, setNutritionData] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3001/nutrition').then((response) => {
   //   console.log("what's in response: ", response.data);
      setNutritionData(response.data)
      
     // setNutrition(response.data.product);
    });
  }, []);

  console.log("What's in nutrition: ", nutritionData)




  // const nutritionData = await axios.get('http://localhost:3001/nutrition')
  // console.log("What's in nutritionData: ", nutritionData)

  return(
    <>
    
    <div>
        {!loggedIn? 
        <div className="ActivityPage css-ra15rn">
            <div className="chakra-container css-1m340o4">
                <h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
            </div>
      </div>
         :
         <>
           
          <div>
                 <div className="nutrition-header">Nutrition</div> 
                 <div className="record-nutrition"><a href="/nutrition/create"><button className="record-btn">Record Nutrition</button></a></div>
                 

              <div className="nutrition-container">
              {nutritionData?.map((nutritionItem)=>{
                  return(
                    <div className ="nutrition-item">
                      <span className="name"> {nutritionItem.name} </span>  
                      <span className="category">{nutritionItem.category}</span> 
                      <p className="calories-title">Calories <span className="quantity-title">Quantity</span></p>
                      <span className="calories">{nutritionItem.calories}</span>
                      <span className="quantity">{nutritionItem.quantity}</span>
                    </div>
              )
            })}
         </div>
        </div>
         </>
         
      }

    </div>
    </>
   
    
    
  
  )
   // const data = nutritionData?.location.state; 
   // console.log("Data info: ", data)
   // console.log("info inside nutrition data inside Nutrition function: ", nutritionData)

   // console.log("nutrition name inside Nutrition function: ", nutritionName)
    //console.log("what's inside nutrition name: ", {nutritionName})
    // return (
    // <>
    // {loggedIn? "true" : 
    
    
    
    
    
    // <div>
    // <h2 class="chakra-heading css-1dklj6k">Log in to see your data.</h2>
    // </div>}

    
    // </>
    
    // )
}

 {/* <div class="NutritionPage css-ra15rn">
    <div class="chakra-container css-1m340o4">
      <h2 class="chakra-heading css-1dklj6k">Log in to see your data.</h2>
   </div>
   </div>  */}
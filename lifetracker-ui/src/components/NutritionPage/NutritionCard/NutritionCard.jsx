import React from 'react'
import './NutritionCard.css'

function NutritionCard({name, category, calories, url, quantity, date}) {
    return (
        <div className='nutrition-card'>
            <div className='icons'>
                 
                    {
                        url.length>0? 
                        <div><img className='food-image' src={url}/> </div>
                        :
                        <div className='name-initial'> <div> {name[0]} </div> </div>

                    }
                
                <div className='food-name'> {name} </div>
                <div className='category'> {category} </div>
            </div>
            <div className='nutrition-data'> 
                <div className='calories'>
                    <p> Calories </p>
                    <h3> {calories} </h3>
                </div>
                <div className='quantity'>
                    <p> Quantity </p>
                    <h3> {quantity} </h3>
                </div>

            </div>
        </div>
    )
}

export default NutritionCard

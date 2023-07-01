import React from 'react'
import './NutritionPage.css'

function NutritionPage() {
    return (
        <div className='nutrition-page'>
            <div className='title-container'>
                <h1> Nutrition </h1>
            </div>
            <p> Nothing here yet. </p>
            {/* <p> Nothing here yet. </p> */}
            <div className='btn'> <button> Record Nutrition </button> </div>
            <div className='fridge'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-fridge-a47d4d66.jpg'/> </div>
        </div>
    )
}

export default NutritionPage

import React, {useState} from 'react'
import './NutritionPage.css'
import NutritionForm from './NutritionForm/NutritionForm'
import NutritionCard from './NutritionCard/NutritionCard'

function NutritionPage({avgCalories, setAvgCalories, nutrition, setNutrition, isAuthenticated, user}) {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className='nutrition-page'>
            <div className='title-container'>
                <h1> Nutrition </h1>
            </div>
            { isAuthenticated?
                (showForm ? 
                <NutritionForm avgCalories={avgCalories} setAvgCalories= {setAvgCalories} isAuthenticated= {isAuthenticated} user={user} setNutrition={setNutrition} nutrition={nutrition} setShowForm={setShowForm}/> :

                    ( nutrition.length>0 ?
                        <div className=' nutrition-cards'> 
                            <div className='btn'> <button onClick={() => setShowForm(true)}> Record Nutrition </button> </div>
                            <div>
                            {nutrition.map((sesh)=> {
                        return(
                            <NutritionCard name={sesh.name} category={sesh.category} calories={sesh.calories} quantity={sesh.quantity} url={sesh.url}/>
                        )
                    })}
                    </div>
                        </div> :
                    
                    <div>
                        <p id='nothing-here'> Nothing here yet. </p>
                        <div className='btn'> <button onClick={() => setShowForm(true)}> Record Nutrition </button> </div>
                        <div className='fridge'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-fridge-a47d4d66.jpg'/> </div>
                    </div>))
                :
                <div className='unauthorized'> Login to view your data. </div>

            }
            {/* <p> Nothing here yet. </p> */}
           
            
        </div>
    )
}

export default NutritionPage

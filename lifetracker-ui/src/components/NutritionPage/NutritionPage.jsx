import React, {useState} from 'react'
import './NutritionPage.css'
import NutritionForm from './NutritionForm/NutritionForm'

function NutritionPage({nutrition, setNutrition, isAuthenticated, user}) {
    const [showForm, setShowForm] = useState(false)
    console.log('hungry user', user, nutrition)

    return (
        <div className='nutrition-page'>
            <div className='title-container'>
                <h1> Nutrition </h1>
            </div>
            {
                showForm ? 
                <NutritionForm isAuthenticated= {isAuthenticated} user={user} setNutrition={setNutrition} nutrition={nutrition} setShowForm={setShowForm}/> :

                    ( nutrition.length>0 ?
                        <div> 
                            <div className='btn'> <button onClick={() => setShowForm(true)}> Record Nutrition </button> </div>
                            {nutrition.map((sesh)=> {
                        return(
                            <div> 
                                calories: {sesh.calories}
                                <br/>
                                quantity: {sesh.quantity}
                            </div>
                        )
                    })}
                        </div> :
                    
                    <div>
                        <p> Nothing here yet. </p>
                        <div className='btn'> <button onClick={() => setShowForm(true)}> Record Nutrition </button> </div>
                        <div className='fridge'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-fridge-a47d4d66.jpg'/> </div>
                    </div>)
            }
            {/* <p> Nothing here yet. </p> */}
           
            
        </div>
    )
}

export default NutritionPage

import React from 'react'
import { useNavigate } from 'react-router-dom'
import FeedTiles from '../FeedTiles/FeedTiles'
import './ActivityPage.css'

function ActivityPage({user, avgSleep, avgCalories, totalExercise, isAuthenticated}) {
    const navigate= useNavigate()

    function addActivity(activity) {
        navigate(`/${activity}-form`)
    }

    // const header= isAuthenticated? `Activity Feed` : `Activity Feed`

    return (
        <div className='activity-page'>
            {  isAuthenticated? 
            
            (
            <div> 
                <div className='header'>
                <div> <h3> Activity Feed </h3> </div>
                <div className= 'buttons'>
                    <button onClick={() => addActivity("exercise")} className='exercise'> Add Exercise </button>
                    <button onClick={() => addActivity("sleep")} className='sleep'> Log Sleep </button>
                    <button onClick={() => addActivity("exercise")} className='nutrition'> Record Nutrition </button>
                </div>
            </div>            
               
            <FeedTiles avgSleep={avgSleep} avgCalories={avgCalories} totalExercise={totalExercise} />
            </div>
            )
                : 
                <div className='unauthorized'> Login to view your data. </div>
            }

        </div>
    )
}

export default ActivityPage

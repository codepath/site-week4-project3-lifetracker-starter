import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SleepForm from './SleepForm/SleepForm'
import './SleepPage.css'
import SleepCard from './SleepCard/SleepCard'

function SleepPage({user,avgSleep, setAvgSleep, sleep, setSleep, isAuthenticated}) {
    const [showForm, setShowForm] = useState(false)
    const [sleepData, setSleepData] = useState()
    

    return (
        <div className='sleep-page'>
            <div className='title-container'>
                <h1> Sleep </h1>
            </div>

            { isAuthenticated?
                
               ( showForm ?
            <SleepForm avgSleep={avgSleep} setAvgSleep= {setAvgSleep} user={user} setSleep={setSleep} sleep={sleep} isAuthenticated={isAuthenticated} setShowForm={setShowForm}/> 
:
                (sleep.length>0 ?
                <div> 
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Sleep </button> </div>
                    <div className='sleep-cards'>
                        {sleep.map((sesh)=> {
                        return(
                            <SleepCard startTime={sesh.start_time} endTime={sesh.end_time}/>
                        )
                    })}
                    </div>
                </div>
                :
                <div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Sleep </button> </div>
                    <div className='bed'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-bed-b93e7358.jpg'/> </div>
                </div>))
                : 
                <div className='unauthorized'> Login to view your data. </div>
                
                    
            } 
            
        </div>
    )
}

export default SleepPage

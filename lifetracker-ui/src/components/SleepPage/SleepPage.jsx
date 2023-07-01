import React, {useState} from 'react'
import SleepForm from './SleepForm/SleepForm'
import './SleepPage.css'

function SleepPage() {
    const [showForm, setShowForm] = useState(false)

    console.log('sf', showForm)

    return (
        <div className='sleep-page'>
            <div className='title-container'>
                <h1> Sleep </h1>
            </div>
            {
                
                showForm ?
                <SleepForm setShowForm={setShowForm}/> :
                <div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Sleep </button> </div>
                    <div className='bed'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-bed-b93e7358.jpg'/> </div>
                </div>
            
            } 
            
        </div>
    )
}

export default SleepPage

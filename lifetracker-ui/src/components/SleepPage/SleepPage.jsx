import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SleepForm from './SleepForm/SleepForm'
import './SleepPage.css'

function SleepPage({user,sleep, setSleep, isAuthenticated}) {
    const [showForm, setShowForm] = useState(false)
    const [sleepData, setSleepData] = useState()
    console.log('sleepy user', user, sleep)
    // const email= user.email

    // useEffect(()=> {
    //     axios.post('http://localhost:3000/sleep', user).then((response) => {
    //       console.log('hi', response.data)
    //       //  setSleep(response)
    //       // setSleep(response.data)
    //     })
        
    // }, [])


    console.log('sf', showForm)

    return (
        <div className='sleep-page'>
            <div className='title-container'>
                <h1> Sleep </h1>
            </div>

            {
                
                showForm ?
            <SleepForm user={user} setSleep={setSleep} sleep={sleep} isAuthenticated={isAuthenticated} setShowForm={setShowForm}/> 
:
                (sleep.length>0 ?
                <div> 
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Sleep </button> </div>
                    {sleep.map((sesh)=> {
                        return(
                            <div> 
                                start: {sesh.start_time}
                                <br/>
                                stop: {sesh.end_time}
                            </div>
                        )
                    })}
                </div>
                :
                <div>
                    <p> Nothing here yet. </p>
                    <div className='btn'> <button onClick={() => setShowForm(true)}> Add Sleep </button> </div>
                    <div className='bed'> <img src='https://lifetracker-ui-ai8e.onrender.com/assets/empty-bed-b93e7358.jpg'/> </div>
                </div>)
            
            } 
            
        </div>
    )
}

export default SleepPage

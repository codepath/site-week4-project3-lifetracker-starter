import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './SleepForm.css'
import axios from 'axios'

function SleepForm({user, avgSleep, setAvgSleep, sleep, setShowForm, setSleep, isAuthenticated}) {
    const [time, setTime] = useState({startTime:'', stopTime:''})
    const navigate= useNavigate()
    const email= user.email

    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name
        setTime({...time, [name]: value})
    }

    function handleSaveInput(e) {
        e.preventDefault()
       const {startTime, stopTime}= time
       const start = new Date(startTime);
       const stop = new Date(stopTime);
       const duration= (stop.getTime() - start.getTime()) / 1000 / (60 * 60);
        if (isAuthenticated && startTime && stopTime){
            axios.post('http://localhost:3000/sleep/create',{email, startTime, stopTime}).then((response) => {
                setShowForm(false)
                setSleep([response.data, ...sleep])
               
                let totalDur= 0
                sleep.forEach((session) => {
                    const start = new Date(session.start_time);
                    const stop = new Date(session.end_time);
                    totalDur += parseInt((stop.getTime() - start.getTime()) / 1000 / (60 * 60));
                  });
                const newAvg= Math.floor((totalDur+ parseInt(duration))/(sleep.length+1))
                setAvgSleep(() => newAvg)
                navigate('/sleep')
            })
            
        }
        
    }

    return (
        <div className='sleep-form'>
            <h1> Record Sleep </h1>
            <div className='sleep-form-inputs'>
            <form onSubmit={(e) => handleSaveInput(e)}>
                <label id='startTime'> Start Time </label>
                <input id='startTime' onChange={(e) => handleFormInput(e)} type= 'datetime-local' name='startTime' required/>
                <label id='stopTime'> End Time </label>
                <input id='stopTime' onChange={(e) => handleFormInput(e)} type= 'datetime-local' name='stopTime' required/>
                <button onClick={(e) => handleSaveInput(e)}> Save </button>
            </form>
            </div>
            
        </div>
    )
}

export default SleepForm
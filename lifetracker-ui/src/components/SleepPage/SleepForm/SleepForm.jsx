import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './SleepForm.css'
import axios from 'axios'

function SleepForm({user, sleep, setShowForm, setSleep, isAuthenticated}) {
    const [time, setTime] = useState({startTime:'', stopTime:''})
    const navigate= useNavigate()
    console.log(user, isAuthenticated)
    const email= user.email
    // const password = user.password

    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name
        console.log(value)
        setTime({...time, [name]: value})
    }

    console.log('t',time)
    function handleSaveInput(e) {
        e.preventDefault()
       const {startTime, stopTime}= time

        if (isAuthenticated && startTime && stopTime){
            axios.post('http://localhost:3000/sleep/create',{email, startTime, stopTime}).then((response) => {
                console.log('r',response)
                setShowForm(false)
                setSleep([response.data, ...sleep])
                navigate('/sleep')
            })
            
        }
        
    }

    return (
        <div>
            <h1> Record Sleep </h1>
            <form onSubmit={(e) => handleSaveInput(e)}>
                <label id='startTime'> Start Time </label>
                <input id='startTime' onChange={(e) => handleFormInput(e)} type= 'datetime-local' name='startTime' required/>
                <label id='stopTime'> End Time </label>
                <input id='stopTime' onChange={(e) => handleFormInput(e)} type= 'datetime-local' name='stopTime' required/>
                <button onClick={(e) => handleSaveInput(e)}> Save </button>
                {/* <input typeonClick={(e) => handleSaveInput(e)}/>  */}
            </form>
        </div>
    )
}

export default SleepForm
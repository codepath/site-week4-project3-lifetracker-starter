import React,{useState} from 'react'
import './SleepForm.css'
import axios from 'axios'

function SleepForm({setShowForm}) {
    const [time, setTime] = useState({startTime:'', stopTime:''})

    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name

        setTime({...time, [name]: value})
    }

    function handleSaveInput() {
        axios.post('http://localhost:3000/')
        setShowForm(false)
    }

    return (
        <div>
            <h1> Record Sleep </h1>
            <form>
                <label> Start Time </label>
                <input onChange={(e) => handleFormInput(e)} type= 'date' name='start-time' />
                <label> End Time </label>
                <input onChange={(e) => handleFormInput(e)} type= 'date' name='end-time'/>
                <button onClick={handleSaveInput}> Save </button>
            </form>
        </div>
    )
}

export default SleepForm
import React,{useState} from 'react'

function ExerciseForm() {
    const [time, setTime] = useState({startTime:'', stopTime:''})

    function handleFormInput(event) {
        const value= event.target.value
        const name= event.target.name

        setTime({...time, [name]: value})
    }

    return (
        <div>
            <h1> Record Sleep </h1>
            <form>
                <label> Start Time </label>
                <input onChange={(e) => handleFormInput(e)} type= 'date' name='start-time' />
                <label> End Time </label>
                <input onChange={(e) => handleFormInput(e)} type= 'date' name='end-time'/>

            </form>
        </div>
    )
}

export default ExerciseForm

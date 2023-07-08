import React, { useState } from 'react'
import './SleepPage.css'
import axios from 'axios'

function SleepPage({ appState, setAppState }) {
    const [sleepform, setSleepForm] = useState({
        start_time: '', end_time: ''
    })

    const [sleepy, setSleepy] = useState(false)
    function handleSleepy(e) {
        e.preventDefault()
        setSleepy(!sleepy)
    }
    console.log(sleepform)
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await axios.post("https://lifetracker-backend-vib.onrender.com/auth/sleep", {
            start_time: sleepform.start_time, end_time: sleepform.end_time, id: appState.user.id
        })
        console.log(res)
        setAppState((prev) => ({
            ...prev,
            sleep: [res.data.sleep, ...prev.sleep]
        }));
        setSleepy(false)
        const token = localStorage.getItem("life_token")
        apiClient.setToken(token)
            
        } catch (error) {
         console.log(error)   
        }

    }
    return (
        <div className='sleep-container'>
            <h8> Sleep </h8>
            {appState.isAuthenticated ? (

                <>
                    {sleepy ? (
                        <>
                            <form className='sleform'>
                                <label> Start Time </label>
                                <input value={sleepform.start_time} onChange={(e) =>
                                    setSleepForm((prev) => ({
                                        ...prev,
                                        start_time: e.target.value,
                                    }))}
                                    type="datetime-local" name="start_time" placeholder="" />

                                <label> End Time </label>
                                <input value={sleepform.end_time} onChange={(e) =>
                                    setSleepForm((prev) => ({
                                        ...prev,
                                        end_time: e.target.value,
                                    }))}
                                    type="datetime-local" name="end_time" placeholder="" />
                            </form>

                            <button className="buttonsave" onClick={handleSubmit}> Save </button>
                        </>) : (
                        <>
                            {appState.sleep.length === 0 ? (<div>
                                {/* <button onClick={handleSleepy}> Add Sleep </button> */}
                                {/* <p> Nothing to see here</p> */}
                            </div>) : (
                                <>
                                <br />
                                    <button className ='adsl' onClick={handleSleepy}> Add Sleep </button>

                                    {appState.sleep.map((sleep) => {
                                        return (
                                            <div className='lognm'>
                                               Created at: {sleep.created_at} <br />
                                               Started at: {sleep.start_time} <br />
                                               Ended at: {sleep.end_time}
                                            </div>
                                        )
                                    })}</>
                            )}
                        </>
                    )}
                </>

            ) : (<p className='logter'>login to view</p>)}


        </div>

    )
}

export default SleepPage

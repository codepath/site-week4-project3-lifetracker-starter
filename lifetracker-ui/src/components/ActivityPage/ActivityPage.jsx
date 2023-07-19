import React, { useState, useEffect } from "react"
import axios from "axios"
import "./ActivityPage.css"


export default function ActivityPage({ setAppState, appState }) {
    const [activityform, setActivityForm] = useState({
        name: '', categories: '', quantity: '', calories: ''

    })
    const [stats, setStats] = useState({
        avgSleep: 0,
        totSleep: 0
    })
    console.log(stats)
    useEffect(() => {
        async function fetch() {
            try {
                const res = await axios.post("https://lifetracker-backend-vib.onrender.com/auth/sleepstats", { id: appState.user.id })
                console.log(res)
                setStats((prev) => ({
                    ...prev,
                    avgSleep: Number(res.data.sleepstats.avgSleep),
                    totSleep: Number(res.data.sleepstats.totSleep)
                }))
            } catch (error) {
            }
        }
        fetch()
    }, [])
    console.log(activityform)
    return (
        <div className='activity-page'>
            <h8> Activity </h8>
            <>
                {appState.isAuthenticated ? (
<>
                <div>
           <p> Average Hours of Sleep </p>
           <span> {stats.avgSleep.toFixed(2)} </span>
          </div>
          <div>
           <p> Total number of hours slept </p>
           <span> {stats.totSleep.toFixed(2)} </span>
          </div>
          </>) : (<p className="logter">login to view</p>)}
            </>

        </div>
    )

}
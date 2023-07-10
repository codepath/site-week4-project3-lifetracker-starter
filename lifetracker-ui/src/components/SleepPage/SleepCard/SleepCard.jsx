import React from 'react'
import './SleepCard.css'

function SleepCard({startTime, endTime}) {

    const start= new Date(startTime)
    const stop= new Date(endTime)
    const startArray= `${start}`.split(' ')
    const stopArray= `${stop}`.split(' ')
    //generating date
    let startDate= startArray.slice(1,4)
    startDate= `${startDate[0]} ${startDate[1]}, ${startDate[2]}`

    //parsing times
    const startTimeMilitary = startArray[4]
    let startHour = parseInt(startTimeMilitary.slice(0,2))
    const startMinutes= (startTimeMilitary.slice(3,5))
    let startTimeNormal= ''

    const stopTimeMilitary = stopArray[4]
    let stopHour = parseInt(stopTimeMilitary.slice(0,2))
    const stopMinutes= (stopTimeMilitary.slice(3,5))
    let stopTimeNormal= ''

    
    const duration= (stop.getTime() - start.getTime())/1000/ (60*60)
    //converting to normal start time
    if (startHour>12){
        startHour= startHour%12
        if (startHour===0){
            startTimeNormal= `12:${startMinutes} PM`
        } else {
            startTimeNormal= `${startHour}:${startMinutes} PM`
        }

    } else {
        if (startHour===0){
            startTimeNormal= `12:${startMinutes} AM`
        } else {
            startTimeNormal= `${startHour}:${startMinutes} AM`
        }
    }

    //converting to normal stop time
    if (stopHour>12){
        stopHour= stopHour%12
        if (stopHour===0){
            stopTimeNormal= `12:${stopMinutes} PM`
        } else {
            stopTimeNormal= `${stopHour}:${stopMinutes} PM`
        }

    } else {
        if (stopHour===0){
            stopTimeNormal= `12:${stopMinutes} AM`
        } else {
            stopTimeNormal= `${stopHour}:${stopMinutes} AM`
        }
    }
    // const startTimeNormal= startHour>12 ? `${startHour%12}`
    return (
        <div className='sleep-card'>
            <div className='header'>
                <div className='duration'> <div> {Math.floor(duration)} </div></div>
                <h1 className='start-date'> {startDate} </h1>

            </div>
            <div className='times'>
                <div className='start'>
                    <p> Start Time </p>
                    <h1> {startTimeNormal} </h1>
                </div>
                <div className='stop'>
                    <p> Stop Time </p>
                    <h1> {stopTimeNormal} </h1>
                </div>
                
            </div>
           
            {/* <div> {category} </div> */}
        </div>
    )
}

export default SleepCard

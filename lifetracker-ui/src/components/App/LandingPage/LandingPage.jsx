import * as React from 'react'
import './LandingPage.css'
import fitbit from '../../../assets/fitbit.svg'


export default function LandingPage(){
    return(
        <div className="landing-page">
            <div className="hero">
                <img src={fitbit} alt="" className="hero-img" />
                <div className='cta'>
                <h1>Life Tracker</h1>
                <p>Helping you take back control of your world</p>
                </div>
            </div>
        </div>
    )
}
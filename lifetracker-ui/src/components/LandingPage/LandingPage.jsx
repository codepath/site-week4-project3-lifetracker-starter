import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div className='left-div'>
        <h1>Get your life on track</h1>
        <p>Now with daily reminders, precise tracking of daily routines, detailed dashboards for your health. Lifetracker is here to help you become the best version of yourself.</p>
        <Link className="sign-up-link" to='/register'>Sign Up Today</Link>
      </div>
      <div className='hero'>
        <img className='hero-img' src='https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'/>
        <p className='cta'>Ready to connect with all your wearables.</p>
      </div>
    </div>
  )
}



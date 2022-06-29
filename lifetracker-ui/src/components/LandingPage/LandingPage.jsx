import React from 'react'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div className='hero'>
        <img className='hero-img' src='https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'/>
        <p className='cta'>This is an application that tracks your life.</p>
      </div>
    </div>
  )
}



import React from 'react'
import './Home.css'
import HomeGrid from '../HomeGrid/HomeGrid'

function Home({user, isAuthenticated}) {
    return (
        <div className='home'>
            <div className='landing'>
                <div className='description'>
                    <h1> LifeTracker </h1>
                    {
                        isAuthenticated ? 
                        <p> Welcome {user.username}! <br/> Track your life with LifeTracker!</p> :
                        <p>Helping you take back control of your world.</p>
                    } 
                </div>
                <div> <img src='https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg' /> </div>
            
            </div>

            <HomeGrid/>
        </div>
        
    )
}

export default Home

import React from 'react'
import './Home.css'
import Tile from '../Tile/Tile'

function Home({user, isAuthenticated}) {
    return (
        <div className='home'>
            <div className='landing'>
                <div className='description'>
                    <h1> LifeTracker </h1>
                    {
                        isAuthenticated ? 
                        <p> Welcome </p> :
                        <p>Helping you take back control of your world.</p>
                    } 
                </div>
                <img src='https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg' />
            
            </div>

            <Tile/>
        </div>
        
    )
}

export default Home

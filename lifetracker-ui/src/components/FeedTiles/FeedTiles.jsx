import React from 'react'
import Tile from '../Tile/Tile'
import './FeedTiles.css'

function FeedTiles({avgSleep, avgCalories, totalExercise}) {
    
    return (
        <div className='feed-tiles'>
            <Tile category={'Total-Exercise-Minutes'} value={totalExercise}/>
            <Tile category={'Average-Hours-of-Sleep'} value={avgSleep}/>
            <Tile category={'Average-Daily-Calories'} value={avgCalories}/>
            
        </div>
    )
}

export default FeedTiles

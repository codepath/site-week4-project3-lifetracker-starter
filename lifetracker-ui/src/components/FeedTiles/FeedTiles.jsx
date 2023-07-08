import React from 'react'
import Tile from '../Tile/Tile'
import './FeedTiles.css'

function FeedTiles({avgSleep, avgCalories, totalExercise}) {
    // const categories= ['Total Exercise Minutes', 'Average Hours of Sleep', 'Average Daily Calories']
    // console.log(Object.entries(activitySummary).map((pair) => {cat}))
    return (
        <div className='feed-tiles'>
            <Tile category={'Total-Exercise-Minutes'} value={totalExercise}/>
            <Tile category={'Average-Hours-of-Sleep'} value={avgSleep}/>
            <Tile category={'Average-Daily-Calories'} value={avgCalories}/>
            {/* yoooo */}
            {/* {
                // <Tile category={"Total Exercise Minutes"} value={0}/>
                Object.entries(activitySummary).map( ([cat, value]) => {
                    // <div> hi </div>
                    return <Tile category={cat} value={value}/>
                })
            }
             */}
            
        </div>
    )
}

export default FeedTiles

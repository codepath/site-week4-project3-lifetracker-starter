import React from 'react'
import Tile from '../Tile/Tile'
import './FeedTiles.css'

function FeedTiles({activitySummary}) {
    // const categories= ['Total Exercise Minutes', 'Average Hours of Sleep', 'Average Daily Calories']
    // console.log(Object.entries(activitySummary).map((pair) => {cat}))
    return (
        <div className='feed-tiles'>
            {/* yoooo */}
            {
                // <Tile category={"Total Exercise Minutes"} value={0}/>
                Object.entries(activitySummary).map( ([cat, value]) => {
                    // <div> hi </div>
                    return <Tile category={cat} value={value} change={'+1.2%'}/>
                })
            }
            
            
        </div>
    )
}

export default FeedTiles

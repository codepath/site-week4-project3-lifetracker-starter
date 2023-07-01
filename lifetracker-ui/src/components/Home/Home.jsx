import React from 'react'
import Hero from "../Hero/Hero"
import FeedTiles from "../FeedTiles/FeedTiles"

function Home({user,loggedin}) {
    return (
        <div>
            <Hero loggedin={loggedin} user={user}/>
           
            <FeedTiles />
        </div>
        
    )
}

export default Home

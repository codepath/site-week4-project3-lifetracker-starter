import React from 'react'
import Hero from "../Hero/Hero"
import FeedTiles from "../FeedTiles/FeedTiles"

function Home({user,isAuthenticated}) {
    return (
        <div>
            <Hero loggedin={isAuthenticated} user={user}/>
           
            <FeedTiles />
        </div>
        
    )
}

export default Home

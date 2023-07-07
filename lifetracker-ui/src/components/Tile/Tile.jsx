import React from 'react'
import './Tile.css'

function Tile({category, value, change}) {
    const title= category.split('-')

    return (
        <div className={category}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            {
                category==='More-Stats' ?

                <div className='more-stats-cont'>
           
                <h1>More Stats </h1>
                <div className='more-stats'> 
                
                    <div>
                        <p>Max Calories in One Meal</p>
                        <h3> {0.0} </h3>
                    </div>
                    <div>
                        <p>Average Exercise Intensity</p>
                        <h3> {0.0} </h3>
                    </div>
                    <div>
                        <p>Total Number of Hours Slept</p>
                        <h3> {0.0} </h3>
                    </div>
                </div>
                </div>
                :
             <div>
                <div> <h3> {title.join(' ')} </h3> </div>
                <div className='data'>
                <div> <h1> {parseFloat(value).toFixed(1)} </h1> </div>
                {
                    change.includes('+') ?
                    <div>
                    <span className="material-symbols-outlined md-48">
                    expand_less
                    </span>
                    <div className='increase'> {change} </div>
                    </div>

                    :
                    <div>
                    <span className="material-symbols-outlined">
                    expand_more
                    </span>
                    <div className='decrease'> {change} </div>
                    </div>
                }   
                </div> 
            </div>   
            
            }
            
            
        </div>
    )
}

export default Tile

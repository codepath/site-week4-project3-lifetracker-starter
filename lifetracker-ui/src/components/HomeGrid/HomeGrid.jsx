import React from 'react'
import './HomeGrid.css'

function HomeGrid() {
    return (
        <div className='home-grid'>
            <div> 
                <h3> Fitness </h3>
                <img className='square' src='https://images.unsplash.com/photo-1571504576237-3c214a43f441?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80'/>
            </div>
            <div>
                <h3> Food </h3>
                <img className='square' src='https://cdn.firespring.com/images/a6a8f82c-850b-47a6-ab54-e9a29e0ce558.jpeg' />
            </div>
            <div>
                <h3> Rest </h3>
                <img className='square' src='https://oregonhealthmart.com/wp-content/uploads/2018/05/health-mart-web-blog-sleeping-pills-1.jpg'/>
            </div>
            <div>
                <h3> Planner </h3>
                <img className='square' src= 'https://kwit.app/en/blogimages/when-to-quit-smoking'/>
            </div>
        </div>
    )
}

export default HomeGrid

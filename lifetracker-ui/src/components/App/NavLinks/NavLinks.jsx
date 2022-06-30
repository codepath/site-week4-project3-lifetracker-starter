import * as React from 'react'
import './NavLinks.css'
import { Link } from 'react-router-dom'

export default function NavLinks(){
    return (
        <div className="nav-links">
            <ul className='links'>
            <li><Link to='/activity'>Activity</Link></li>
            <li><Link to='/nutrition/*'>Nutrition</Link></li>
            <li><Link to='/'>Exercise</Link></li>
            <li><Link to='/'>sleep</Link></li>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='register'>signup</Link></li>
            <li><Link to='/'>Logout</Link></li>
            </ul>
        </div>
    )
}
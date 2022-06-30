import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <div>
            <nav className='navbar'>
                <Logo className='logo' />
                <NavLinks className='navlinks' />
            </nav>
        </div>
    )
}

export function Logo() {
    return (
        <Link to="/"><img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" />
        </Link>
    )
}

export function NavLinks() {
    return (
        <div className='navlink'>
            <Link className="links" to="/activity"> Activity </Link>
            <Link className="links" to="/exercise"> Exercise </Link>
            <Link className="links" to="/nutrition"> Nutrition </Link>
        </div>
    )
}




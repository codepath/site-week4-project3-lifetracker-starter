import {Link} from "react-router-dom"
import "./NavLinks.css"

export default function NavLinks() {
    return (
        <div className="nav-links">
            <ul className="links">
                <li><Link to="/activity">Activity</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/exercise">Exercise</Link></li>
                <li><Link to="/sleep">Sleep</Link></li>
                <li><Logio/></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    )
}

function Logio() {
    let isUserloggedIn = false;

    let label = '';
    let path = '';

    if(isUserloggedIn) {
        path = '/'
        label = 'Logged IN'
    } else {
        path = '/login'; label = 'Login'
    }

    return (
        <Link to={path}>{label}</Link>
    )
}


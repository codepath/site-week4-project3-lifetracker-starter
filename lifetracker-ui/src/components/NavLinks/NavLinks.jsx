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
            </ul>
        </div>
    )
}


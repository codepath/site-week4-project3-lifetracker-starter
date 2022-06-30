import {Link} from "react-router-dom"
import NavLinks from "../NavLinks/NavLinks"
import "./Navbar.css"


export default function LandingPage (props) {
    return (
        <div className="navbar">
            <div className="content">
                <div className="logo">
                    <Link to="/">
                        <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"/>
                    </Link>
                </div>
                <NavLinks />
            </div>
        </div>
    )
}
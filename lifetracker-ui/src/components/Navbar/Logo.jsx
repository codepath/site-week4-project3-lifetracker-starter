import * as React from "react"
import {Link} from "react-router-dom"
import "../Navbar/Navbar.css"

export default function Logo()
{
    return(
              <Link to="/" className="logo"><img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" className="logo"/></Link>
    )
}
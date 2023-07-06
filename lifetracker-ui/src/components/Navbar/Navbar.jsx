import "./Navbar.css"
import logo from "../../assets/codepath.svg"

function Navbar(){
    return(
        <nav className="Navbar">
            <div className="links">
                <li>
                    <a href = "/">
                        <img src = {logo} alt = "logo"/>
                    </a>
                </li>
                <li>
                    <a href = "/activity">Activity</a>
                </li>
                <li>
                    <a href = "/exercise">Exercise</a>
                </li>
                <li>
                    <a href = "/nutrition">Nutrition</a>
                </li>
                <li>
                    <a href = "/sleep">Sleep</a>
                </li>
            </div>
            <div className="buttons">
                <button>
                    <a href = "/login">Login</a>
                </button>
                <button>
                    <a href = "/register">Register</a>
                </button> 
            </div>
        </nav>
    )
}

export default Navbar
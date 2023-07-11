import './Navbar.css'

export default function Navbar({ loggedIn, logout }) {
    return (
 <div className="navbar">
    <div className="non-authentication">
        
    <div className='componentSection'>
        <a className="codepathHomeimage" href="/"><img className='logo-img' src="src/assets/codepath.svg" alt="logo" /></a>
        <a className="componentNav" href="/activity">Activity</a>
        <a className="componentNav" href="/exercise">Exercise</a>
        <a className="componentNav" href="/nutrition">Nutrition</a>
        <a className="componentNav" href="/sleep">Sleep</a>
    </div>
    </div>
    <div className="authenticationButtons">
    {!loggedIn &&
    <div className='entryButtons'>
        <a className="login-button-link" href="/login"><button type="button" className="login-button">Sign In</button></a>
        <a className="register-button-link" href="/register"><button type="button" className="register-button">Register</button></a>
        </div>
} 
{loggedIn && 
        <div className="logoutdiv">
        <a className="logout-button-link" href="/login"><button onClick= {logout} type="button" className="logout-button">Sign Out</button></a>
    </div>

}
</div>
</div>

    )
  }
  
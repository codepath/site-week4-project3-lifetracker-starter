import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Navbar.css'

function Navbar({isAuthenticated, handleLogout}) {
    const navigate = useNavigate()

    function enableLogin() {
        navigate('/login')
    }

   

    function enableRegister() {
        navigate('/register')
    }

    function logout(){
        handleLogout()
        navigate('/')
    }

    return (
        <nav className="navbar">
      <div className="website-title">
        {/* <Logo/> */}
        <Link to='/'>
            <img src='https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg'/>
        </Link>
        {/* <h1 className="store-name"> LifeTracker </h1> */}
      </div>
      <ul>
        <li> <Link className='nav-link' to='/activity'> Activity </Link> </li>
        <li> <Link className='nav-link' to='/exercise'> Exercise </Link> </li>
        <li> <Link className='nav-link' to='/nutrition'> Nutrition </Link> </li>
        <li> <Link className='nav-link' to='/sleep'> Sleep </Link> </li>

        <div className='button-container'>
            {
                isAuthenticated? 
                    <button onClick={logout} className='sign-in'> Sign Out </button>
                :
                <div>
                     <button onClick={enableLogin} className='sign-in'> Sign In </button>
                     <button onClick={enableRegister} className='register'> Register </button>
          
                </div>
            }
            
        </div>
        {/* <li><Link className="nav-link" to="/buy-now">Buy Now</Link></li> */}
      </ul>
    </nav>
        // <div className='navbar'>
            // {/* hi  */}
            // <li>activity </li>
            // <li>activity </li>
            // <li>activity </li> 
            // <nav className='navbar'>

            // <div className='logo'>
            //     <Link to='/'>
            //         <img src='https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg'/>
            //     </Link>
            // </div>

            // <div className='link-and-buttons'>
            //     <div className='link-container'>
            //         <ul>

            //         <li> <Link className='nav-link' to='/activity'> Activity </Link> </li>
            //         <li> <Link className='nav-link' to='/exercise'> Exercise </Link> </li>
            //         <li> <Link className='nav-link' to='/nutrition'> Nutrition </Link> </li>
            //         <li> <Link className='nav-link' to='/sleep'> Sleep </Link> </li>
            //     </ul>
            //     </div>

            //     <div className='button-container'>
            //         <Link to='/login'> <button className='sign-in'> Sign In </button> </Link>
            //         <Link to='/register'> <button className='register'> Register </button> </Link>
            //     </div>
            // </div>
            // </nav>
            
            

            
        // </div>
    )
}

export default Navbar

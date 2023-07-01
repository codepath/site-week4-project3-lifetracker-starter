import React,{useState} from 'react'
import './RegistrationPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegistrationPage({setUser, setIsAuthenticated}) {
    const [regInfo, setRegInfo] = useState({email:'', username:'', firstName:'', lastName:'', password:'', confPassword:''})
    const navigate= useNavigate()

    async function handleSignUp(event) {
        event.preventDefault()
        // if (password===confPassword){
            // console.log(email)
        const newUser= await axios.post('http://localhost:3000/auth/register', regInfo)
        console.log('nw', newUser)
        setIsAuthenticated(true)
        setUser(newUser.data.user)
        navigate('/')


        // }
    }

    function handleRegistration(e) {
        const value= e.target.value
        const name= e.target.name

        setRegInfo({...regInfo, [name]:value})

    }

    return (
        <div className='registration-page'>
            <div className='reg-container'>
            <h1> Create an Account </h1>
            <form>
                <input name='email' value={regInfo.email} onChange={(e)=>handleRegistration(e)} placeholder='Email'/>
                <input name='username' value={regInfo.username} onChange={(e)=>handleRegistration(e)} placeholder='Username'/>
                <input name='firstName' value={regInfo.firstName} onChange={(e)=>handleRegistration(e)} placeholder='First name'/>
                <input name='lastName' value={regInfo.lastName} onChange={(e)=>handleRegistration(e)} placeholder='Last name'/>
                <input name='password' value={regInfo.password} onChange={(e)=>handleRegistration(e)} placeholder='Password' type='password'/>
                <input name='confPassword' value={regInfo.confPassword} onChange={(e)=>handleRegistration(e)} placeholder='Confirm password' type='password'/>
            </form>
            <button onClick={handleSignUp} > Sign up</button>
            <span> 
                Have an account? 
                <Link to='/login'> Login </Link>
                
            </span>
            </div>
           
        </div>
    )
}

export default RegistrationPage

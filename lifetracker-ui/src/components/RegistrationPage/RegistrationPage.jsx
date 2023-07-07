import React,{useState} from 'react'
import './RegistrationPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegistrationPage({handleRegistration}) {
    const [regInfo, setRegInfo] = useState({email:'', username:'', firstName:'', lastName:'', password:'', confPassword:''})
    const navigate= useNavigate()

    async function handleSignUp(event) {
        event.preventDefault()
        await handleRegistration(regInfo.email, regInfo.username, regInfo.firstName, regInfo.lastName, regInfo.password)
        // // if (password===confPassword){
        //     // console.log(email)
        // const newUser= await axios.post('http://localhost:3000/auth/register', regInfo)
        // console.log('nw', newUser)
        // setIsAuthenticated(true)
        // setUser(newUser.data.user)
        navigate('/')


        // }
    }

    


    function handleFormInput(e) {
        const value= e.target.value
        const name= e.target.name

        setRegInfo({...regInfo, [name]:value})

    }

    return (
        <div className='registration-page'>
            <div className='reg-container'>
            <h1> Create an Account </h1>
            <form>
                <input name='email' value={regInfo.email} onChange={(e)=>handleFormInput(e)} placeholder='Email'/>
                <input name='username' value={regInfo.username} onChange={(e)=>handleFormInput(e)} placeholder='Username'/>
                <input name='firstName' value={regInfo.firstName} onChange={(e)=>handleFormInput(e)} placeholder='First name'/>
                <input name='lastName' value={regInfo.lastName} onChange={(e)=>handleFormInput(e)} placeholder='Last name'/>
                <input name='password' value={regInfo.password} onChange={(e)=>handleFormInput(e)} placeholder='Password' type='password'/>
                <input name='confPassword' value={regInfo.confPassword} onChange={(e)=>handleFormInput(e)} placeholder='Confirm password' type='password'/>
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

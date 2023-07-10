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
                <img src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v937-aew-139.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=df5cf03ba78dce75d913bb39d9e75a93'/>
                <h1> Create an Account </h1>
                <div className='reg-input-container'>
                    <form >
                        <input name='email' value={regInfo.email} onChange={(e)=>handleFormInput(e)} placeholder='Email'/>
                        <input name='username' value={regInfo.username} onChange={(e)=>handleFormInput(e)} placeholder='Username'/>
                        <input name='firstName' value={regInfo.firstName} onChange={(e)=>handleFormInput(e)} placeholder='First name'/>
                        <input name='lastName' value={regInfo.lastName} onChange={(e)=>handleFormInput(e)} placeholder='Last name'/>
                        <input name='password' value={regInfo.password} onChange={(e)=>handleFormInput(e)} placeholder='Password' type='password'/>
                        <input name='confPassword' value={regInfo.confPassword} onChange={(e)=>handleFormInput(e)} placeholder='Confirm password' type='password'/>
                    </form>
                    <button onClick={handleSignUp} > Sign up</button>

                </div>
            <br/>
            <br/>

            <div> 
                Have an account? 
                <Link to='/login'> Login </Link>
                
            </div>
            </div>
           
        </div>
    )
}

export default RegistrationPage

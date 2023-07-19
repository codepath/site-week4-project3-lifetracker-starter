import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import axios from 'axios'

function LoginPage({handleLogin, isAuthenticated}) {
    const [loginInfo, setLoginInfo] = useState({email:'', password:''})
    const navigate= useNavigate()
  
    async function handleSubmit(e){
        e.preventDefault()
        await handleLogin(loginInfo.email, loginInfo.password)
        // isAuthenticated && 
        navigate('/')
    }

    function handleFormInput(e) {
        const value= e.target.value
        const name=  e.target.name

        setLoginInfo({...loginInfo, [name]:value})

    }
    

    return (
        <div className='login'>
            <div className='login-container'>
                <img src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v937-aew-139.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=df5cf03ba78dce75d913bb39d9e75a93'/>
                <h1> Welcome </h1>

                <div  className='login-form'>
                    <form >
                        <input name='email' onChange={(e)=> handleFormInput(e)} placeholder='   Email'/>
                        <input name= 'password' onChange={(e)=> handleFormInput(e)} placeholder='  Password' type='password'/>
                    </form>
                    <button onClick= {(e) => handleSubmit(e)} > Login </button>
                </div>
               
            </div>
        </div>
    )
}

export default LoginPage

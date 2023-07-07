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
        isAuthenticated && navigate('/')
    }

    function handleFormInput(e) {
        const value= e.target.value
        const name=  e.target.name

        setLoginInfo({...loginInfo, [name]:value})

    }
    

    return (
        <div className='login'>
            <div className='login-container'>
                <h1> Welcome </h1>
                <form>
                    <input name='email' onChange={(e)=> handleFormInput(e)} placeholder='Email'/>
                    <input name= 'password' onChange={(e)=> handleFormInput(e)} placeholder='Password' type='password'/>
                </form>
                <button onClick= {(e) => handleSubmit(e)} > Login </button>
            </div>
        </div>
    )
}

export default LoginPage

import React, {useState} from 'react'
import './LoginPage.css'
import axios from 'axios'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(event){
        event.preventDefault()
        axios.post('http://localhost:3000/auth/login', {email, password})
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <h1> Welcome </h1>
                <form>
                    <input onChange={()=> setEmail()} placeholder='Email'/>
                    <input onChange={()=> setPassword()} placeholder='Password' type='password'/>
                </form>
                <button onClick= {handleLogin} > Login </button>
            </div>
        </div>
    )
}

export default LoginPage

import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router-dom'
import './SignIn.css'
import axios from 'axios'

function SignIn({setAppState}) {
    const [formSignInput, setFormSignInput] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/auth/login", formSignInput)
        console.log(res)
        setAppState((prev)=> ({
            ...prev,
            user: res.data.userInfo,
            isAuthenticated: true,
            exercise: [],
            nutrition: [],
            sleep:res.data.sleep
        }));
        navigate('/', { replace: true })
    }

    return (

        <div className="SignIn-Page">
            <div className='formSign'>
                <h4> Welcome </h4>
                <form className='formSign input'>
                    <input value={formSignInput.email} onChange={(e) =>
                        setFormSignInput((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))}
                        name="email" placeholder="Input Email" />
                    <input type={"password"} value={formSignInput.password} onChange={(e) =>
                        setFormSignInput((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))}
                        name="password" placeholder="password" />
                </form>
                <button className="buttonsig" onClick={handleSubmit} > Sign In! </button>
            </div>
        </div>

    )
}

export default SignIn

import * as React from 'react'
import { Navigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import './LoginPage.css'


export default function LoginPage(){
    return(
        <div className="login-page">
            <LoginForm />
        </div>
    )
}
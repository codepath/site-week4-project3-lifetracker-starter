import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import './LoginForm.css'


export default function LoginForm(){
    const [loginForm, setLoginForm] = React.useState({email : "", password : ""})
    const [improperEmail, setImproperEmail] = React.useState(false)

    const handleOnChange = (event) => {
        const value = event.target.value
        const field = event.target.name

        if(field == 'email'){
            if(!value.includes('@')) setImproperEmail(true)
            else setImproperEmail(false)
        }
        
        
        setLoginForm({...loginForm, [field] : value})
    }

    return(
        <div className="login-form">
            <div className="input-window">
                <div className="card">
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-input" name='email' value={loginForm.email} onChange={handleOnChange} placeholder="jane@doe.com"/>
                        {improperEmail ? <p className='error'> not valid email </p> : <></>}
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-input" name='password'value={loginForm.password} onChange={handleOnChange} placeholder="Password"/>
                    </div>
                
                    <div className="register-btn">
                        <button className='signin'> Login </button>
                    </div>
                </div> 
                <div className="redirect">
                    <p className="signin">Don't have an account? <Link to='/register' className='restore'>SignUp</Link> </p>
                </div>
            </div>
        </div>
    )
}
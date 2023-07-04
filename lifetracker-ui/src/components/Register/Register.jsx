import './Register.css'
import axios from "axios"
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

function Register({setAppState}) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        agreeToTerms: true
      })

    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
        if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
            setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
        } else {
            setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
        }
        if (event.target.name === "passwordConfirm") {
        if (form.password && form.password !== event.target.value) {
            setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
        } else {
            setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
        }
        if (event.target.name === "email") {
        if (event.target.value.indexOf("@") === -1) {
            setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
        } else {
            setErrors((e) => ({ ...e, email: null }))
        }
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }


    const handleOnSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
    
        if (form.passwordConfirm !== form.password) {
          setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
          setIsLoading(false)
          return
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }))
        }
    
        try {
            const res = await axios.post('http://localhost:3002/auth/register', {
            firstName: form.firstName,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
            password: form.password,
          })
    
          if (res?.data?.user) {
            setAppState(res.data)
            setIsLoading(false)
            navigate("/portal")
          } else {
            setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
            setIsLoading(false)
          }
        } catch (err) {
          console.log(err)
          const message = err?.response?.data?.error?.message
          setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
          setIsLoading(false)
        }
        setForm({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            agreeToTerms: true // CHANGE LATER !!!!!
          })
      }


  return (

    <div className='center'>
    <div className="register-container">
        
        <h2 className="header">Create an Account</h2>
        <div className="form-container">

            <form onSubmit={handleOnSubmit}>
                <div className="input-container">
                    <div role="group" className="email-input">
                        
                            
                            <input 
                                name="email"
                                type="email" 
                                placeholder="Email" 
                                id="field-:rc:" 
                                required="" 
                                aria-required="true" 
                                className="email-input input" 
                                value={form.email} 
                                onChange={handleOnInputChange}
                                />
                    
                        
                    </div>
                    
                    <div role="group" className="input-container">
                        <div className="username-input" data-group="true">
                            
                            
                            <input 
                            name="username" 
                            type="text" 
                            placeholder="Username" 
                            id="field-:rd:" 
                            required="" 
                            aria-required="true" 
                            className="username-input input" 
                            value={form.username}
                            onChange={handleOnInputChange}
                            />
                        </div>
                    </div>
                    
                        <div role="group" className="input-container">
                            <div className="firstname-input" data-group="true">
                                <input 
                                type="text" 
                                name="firstName" 
                                placeholder="First name" 
                                id="field-:re:" 
                                required="" 
                                aria-required="true" 
                                className="firstname-input input" 
                                value={form.firstName}
                                onChange={handleOnInputChange}
                                />
                            </div>
                        </div>
                        
                    <div role="group" className="input-container">
                        <div className="lastname-input" data-group="true">
                            <input 
                            name="lastName" 
                            type="text" 
                            placeholder="Last name" 
                            id="field-:rf:" 
                            required="" 
                            aria-required="true" 
                            className="lastname-input input" 
                            value={form.lastName}
                            onChange={handleOnInputChange}
                            />
                        </div>
                    </div>
                    
                    <div role="group" className="input-container">
                        <div className="password-input" data-group="true">
                            <div className="icon-container">
                                <svg className="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                    </path>
                                </svg>
                            </div>
                            <input 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            id="field-:rg:" 
                            required=""
                            aria-required="true" 
                            className="password-input input" 
                            value={form.password}
                            onChange={handleOnInputChange}
                            />
                            

                        </div>
                    </div>
                    
                    <div role="group" className="input-container">
                        <div className="confirmpassword-input" data-group="true">
                            <div className="icon-container">
                                <svg className="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                    </path>
                                </svg>
                                
                            </div>
                            
                            <input 
                            name="passwordConfirm" 
                            type="password" 
                            placeholder="Confirm Password" 
                            id="field-:rh:" required="" 
                            aria-required="true" 
                            className="confirmpassword-input input" 
                            value={form.passwordConfirm}
                            onChange={handleOnInputChange}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="button">Sign up</button>
                </div>
            </form>
        </div>
    </div>
    </div>

  )
}

export default Register
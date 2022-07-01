import * as React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient"
import "./RegistrationForm.css"
 
export default function RegistrationForm({user, setUser}) {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      username: "", 
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: ""
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
          if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
            setErrors((error) => ({ ...error, passwordConfirm: "Password's do not match" }))
          } else {
            setErrors((error) => ({ ...error, passwordConfirm: null }))
          }
        }
        if (event.target.name === "passwordConfirm") {
          if (form.password && form.password !== event.target.value) {
            setErrors((error) => ({ ...error, passwordConfirm: "Password's do not match" }))
          } else {
            setErrors((error) => ({ ...error, passwordConfirm: null }))
          }
        }
        if (event.target.name === "email") {
          if (event.target.value.indexOf("@") === -1) {
            setErrors((error) => ({ ...error, email: "Please enter a valid email." }))
          } else {
            setErrors((error) => ({ ...error, email: null }))
          }
        }
    
        setForm((form) => ({ ...form, [event.target.name]: event.target.value }))
      }

      const handleOnSubmit = async () => {
        setIsLoading(true)
        setErrors((error) => ({ ...error, form: null }))
    
        if (form.passwordConfirm !== form.password) {
          setErrors((error) => ({ ...error, passwordConfirm: "Passwords do not match." }))
          setIsLoading(false)
          return
        } else {
          setErrors((error) => ({ ...error, passwordConfirm: null }))
        }

        const {data, error} = await apiClient.signupUser({ email: form.email, password: form.password})
        if(error) setErrors((e) => ({ ...e, form: error}))
        if(data?.user) {
          setUser(data.user)
          apiClient.setToken(data.token)
        }
        // setIsProcessing(false)
      }

    return (
        <div className="registration-form">
            <h1>Register</h1>
            <div className="registration-container">

                <input className="form-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleOnInputChange} />

                <input className="form-input" name="username" type="text" placeholder="your_username" value={form.username} onChange={handleOnInputChange} />
                
                <input className="form-input" name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleOnInputChange} />
                <input className="form-input" name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleOnInputChange} />

                <input className="form-input" name="password" type="password" placeholder="Enter a secure password" value={form.password} onChange={handleOnInputChange} />

                <input className="form-input" name="passwordConfirm" type="password" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange} />

                <button className="submit-registration" onClick={handleOnSubmit}>Create Account</button>

                <div className="login-redirect">
                    <p>Already have an account? Login <Link to="/login"><span>here</span></Link></p>
                </div>
            </div>
        </div>
    )
}
import * as React from "react"
import { useState, useEffect } from "react"
import API from "../../services/apiClient"
import { useNavigate, Link } from "react-router-dom"
import "./RegistrationForm.css"
import { useAuthContext } from "../../contexts/auth"
import { useActivityContext } from "../../contexts/activity"
import { useNutritionContext } from "../../contexts/nutrition"

export default function RegistrationForm() {
  const {user, setUser} = useAuthContext()
    const [form, setForm] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
      })
      const [error, setError] = useState({})
      const navigate = useNavigate()
      const{fetchActivity} = useActivityContext()
      const {fetchNutritions, setNutritions} = useNutritionContext()
      
      useEffect(() => {
          if(user?.email){
              fetchActivity()
              setNutritions([])
              navigate("/activity")
          }
      }, [user, navigate, setUser])

    const handleOnInputChange = (event) => {
        // Check for valid email
        if (event.target.name == "email") {
          if (event.target.value.indexOf("@") == -1) {
            setError((state) => ({ ...state, email: "Please enter a valid email." }))
          } 
          else {
            setError((state) => ({ ...state, email: null }))
          }
        }
        // password field
        else if (event.target.name == "password") {
            if (form.passwordConfirm && form.passwordConfirm != event.target.value) {
              setError((state) => ({ ...state, passwordConfirm: "passwords don't match" }))
            } 
            else {
              setError((state) => ({ ...state, passwordConfirm: null }))
            }
        }
        // confirm password field
        else if (event.target.name == "passwordConfirm") {
            if (form.password && form.password != event.target.value) {
              setError((state) => ({ ...state, passwordConfirm: "passwords don't match" }))
            } 
            else {
              setError((state) => ({ ...state, passwordConfirm: null }))
            }
        }
        setForm((state) => ({ ...state, [event.target.name]: event.target.value }))
    }

    const signupUser = async (e) => {
      e.preventDefault()
        // placeholder, replace with context

        if (form.passwordConfirm != form.password) {
            setError((state) => ({ ...state, passwordConfirm: "passwords don't match." }))
            return
        } 
        else if (!form.password){
            setError((state) => ({ ...state, passwordConfirm: "You must enter a password." }))
            return
        }
        else {
            setError((state) => ({ ...state, passwordConfirm: null }))
        }

        const {data, error} = await API.signupUser({email: form.email,
                  username: form.username,
                  firstName: form.firstName,
                  lastName: form.lastName,
                  password: form.password,})
        console.log(data, error)
        if (error) setError((state) => ({ ...state, form: error }))
        if(data?.user){
          setUser(data.user)
          API.setToken(data.token)
        }
        // try{
        //     const json = await axios.post("http://localhost:3001/auth/register", {
        //         email: form.email,
        //         username: form.username,
        //         firstName: form.firstName,
        //         lastName: form.lastName,
        //         password: form.password,
        //     })
        //     if(json?.data?.user){
        //         props.setAppState(json.data)
        //         setForm({
        //             email: "",
        //             username: "",
        //             firstName: "",
        //             lastName: "",
        //             password: "",
        //             passwordConfirm: "",
        //           })
        //           props.setUser(json.data.user)
        //         navigate("/")
        //     }
        //     else{
        //         setError((state) => ({ ...state, form: "Something went wrong with registration." }))
        //     }
        // }catch(err) {
        //     const message = err?.response?.data?.error?.message
        //     setError((state) => ({ ...state, form: message ? String(message) : String(err) }))
        // }
    }

    return (
        <div className="registration-form">
            <h1>Sign Up</h1>
            <img src="\src\assets\icons8-sign-up-60.png" alt="sign up"></img>
            <form>
                <div className="form-inputs">
                    <input className="form-input" type="email" name="email"
                            placeholder="user@gmail.com"
                            value={form.email}
                            onChange={handleOnInputChange}/>
                    {error.email ? (<p className="error">{error.email}</p>) : null}
                    <input className="form-input" type="text" name="username"
                            placeholder="username"
                            value={form.username}
                            onChange={handleOnInputChange}/>
                    <input className="form-input" type="text" name="firstName"
                            placeholder="Jane"
                            value={form.firstName}
                            onChange={handleOnInputChange}/>
                    <input className="form-input" type="text" name="lastName"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={handleOnInputChange}/>
                    <input className="form-input" type="password" name="password"
                            placeholder="password"
                            value={form.password}
                            onChange={handleOnInputChange}/>
                    {error.password ? (<p className="error">{error.password}</p>) : null}
                    <input className="form-input" type="password" name="passwordConfirm"
                            placeholder="confirm password"
                            value={form.passwordConfirm}
                            onChange={handleOnInputChange}/>
                    {error.passwordConfirm ? (<p className="error">{error.passwordConfirm}</p>) : null}
                </div>
                <button className="submit-registration" onClick={signupUser}>Create Account</button>
                {error.form ? (<p className="error">{error.form}</p>) : null}
            </form>
            <p>Have a lifetracker account? <Link to="/login">Login here</Link></p>
        </div>
    )}
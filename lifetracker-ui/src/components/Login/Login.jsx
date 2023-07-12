import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import lady from "../../assets/lady-exercising.jpeg"
import apiClient from "../../../services/apiClient"

import "./Login.css"
import jwtDecode from "jwt-decode"

export default function Login({ setAppState, user, setUser }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    const {data, error} = await apiClient.loginUser({email:form.email, password: form.password })
    if(error) setErrors((e) => ({...e, form:error}))
    if(data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
      navigate("/activity")
    

    // try {
    //   const res = await axios.post(`http://localhost:3005/auth/login`, form)
    //   if (res?.data) {
    //     console.log(" RES")
    //     console.log(res.data)
    //     //setAppState(res.data)
    //     const { token } = res.data;
    //     localStorage.setItem("token", token);
    //     const decodedToken = jwtDecode(token);
    //     setAppState(decodedToken);
    //     //setIsLoggedIn(true);
    //     setIsLoading(false)
    //     navigate("/activity")
    //     localStorage.setItem("token", res.data.token)
    //     setUserEmail(form.email)
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
    //     setIsLoading(false)
    //   }
    //   if (res?.data?.token) {
    //     // Save the token in local storage or cookie
    //     localStorage.setItem("token", res.data.token);
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    //   setIsLoading(false)
    // }
    
    }
  }


  return (
    <div className="Login">
      <div className="media">
        <img src={lady} alt="health" />
      </div>
      
      <div className="card">
        <h2>Login</h2>

        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

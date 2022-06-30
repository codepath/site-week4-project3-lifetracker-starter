import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./LoginPage.css"

export default function LoginPage({ setAppState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

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

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, form) // post the form and see if contents are valid
      if (res?.data) {
        setAppState(res.data)
        setIsLoading(false)
        // navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }

  return (
    <div className="Login">
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
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
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
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>

        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  )
}



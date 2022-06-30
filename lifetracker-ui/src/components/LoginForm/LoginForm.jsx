import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import "./LoginForm.css";

export default function LoginForm({loggedIn}) {
    //state to check if user is logged in
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)

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
        /*
        try {
          const res = await axios.post(`http://localhost:3001/auth/login`, form)
          if (res?.data) {
            setAppState(res.data)
            setIsLoading(false)
            navigate("/portal")
          } else {
            setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
            setIsLoading(false)
          }
        } catch (err) {
          console.log(err)
          const message = err?.response?.data?.error?.message
          setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
          setIsLoading(false)
        }*/
      }
    

    return (
        <div className="login-form">
          <h2>Login</h2>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                className="form-input"
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
                className="form-input"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleOnInputChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="btn-row">
              <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
              {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          
        </div>
    );
}
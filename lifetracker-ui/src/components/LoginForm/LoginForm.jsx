import * as React from "react";
import {Redirect} from 'react'
import axios from "axios";
import apiClient from "../../services/apiClient";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./LoginForm.css";

export default function LoginForm({setUser}) {
    //state to check if user is logged in

    const navigate = useNavigate()
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

        const {data, error} = await apiClient.loginUser({email: form.email, password: form.password});
        if (error) {
          setErrors((e) => ({ ...e, form: error }))
          const message = error?.response?.data?.error?.message
          setErrors((e) => ({ ...e, form: message ? String(message) : String(error) }))
          setIsLoading(false)
        }
        if (data?.user) {
          setUser(data.user);
          apiClient.setToken(data.token);
          setIsLoading(false);
          navigate("/activity");
        }
        
        /*try {
          console.log("form", form);
          const res = await axios.post(`http://localhost:3001/auth/login`, form)
          if (res?.data) {
            setUser(res.data);
            setLoggedIn(true);
            setIsLoading(false);
            navigate("/activity");
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
          {Boolean(errors.form) && <span className="error">{errors.form}</span>}
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
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
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
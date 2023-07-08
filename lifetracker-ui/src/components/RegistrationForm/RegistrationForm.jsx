import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./RegistrationForm.css"
import apiClient from "../../Services/apiClient"

export default function Register({ appState, setAppState}) {
    const [formInput, setFormInput] = useState({ email: '', username: '', firstname: '', lastname: '', password: '', confpassword: '' })
    const navigate = useNavigate()

    function handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        setFormInput({ ...formInput, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
         try {
            const { data, error, message } = await apiClient.register(
                formInput
            )
            console.log(data)
            console.log(error)
            if(data){setAppState((prev)=> ({
                    ...prev,
                    user: data.user,
                    isAuthenticated: true,
                    exercise: [],
                    nutrition: [],
                    sleep: []
                }));}
        // setloggedin(true)
        localStorage.setItem("life_token", data.token);
        apiClient.setToken(data.token);
        navigate('/', { replace: true })
         } catch (error) {
            console.log(error)
            
         }
        // try {
        //     const res = await axios.post("http://localhost:3000/auth/register", formInput)
        // console.log(res)
        // setAppState((prev)=> ({
        //     ...prev,
        //     user: res.data.firstname,
        //     isAuthenticated: true,
        //     exercise: [],
        //     nutrition: [],
        //     sleep: []
        // }));
        // (res.data.firstname)
        // navigate('/', { replace: true })
        // setloggedin(true)
        // localStorage.setItem("life_token", res.data.token)
            
        // } catch (error) {
        //     console.log(error)
            
        // }
    }
    return (
        <div className="registration-page">
            <h5> Create Account </h5>
            <div className="form">
                <form>

                    <input value={formInput.email} onChange={(e) => handleChange(e)} name="email" placeholder="Input Email" />
                    <input value={formInput.username} onChange={(e) => handleChange(e)} name="username" placeholder="Input Username" />
                    <input value={formInput.firstname} onChange={(e) => handleChange(e)} name="firstname" placeholder="First Name" />
                    <input value={formInput.lastname} onChange={(e) => handleChange(e)} name="lastname" placeholder="Last Name" />
                    <input type={"password"} value={formInput.password} onChange={(e) => handleChange(e)} name="password" placeholder="Password" />
                    <input type={"password"} value={formInput.confpassword} onChange={(e) => handleChange(e)} name="confpassword" placeholder="Re-type Password" />
                </form>
                <button className="buttonreg" onClick={handleSubmit}> Register </button>

            </div>
        </div>
    )
}


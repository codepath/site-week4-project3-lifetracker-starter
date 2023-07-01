import React, {useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./RegistrationForm.css"

export default function Register({setUser, setloggedin}) {
    const [formInput, setFormInput] = useState({ email: '', username: '', firstname: '', lastname: '', password: '' , confpassword:''})
    const navigate = useNavigate()

    function handleChange(e) {
        const value = e.target.value
        const name = e.target.name
        setFormInput({ ...formInput, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const res= await axios.post("http://localhost:3000/auth/register", formInput)
        console.log(res)
        setUser(res.data.firstname)
        navigate('/', {replace:true})
        setloggedin(true)
    }
    return (
        <div className="registration-page">
            <h1> Create Account </h1>
            <div className="form">
                <form>
                    <input value={formInput.email} onChange={(e) => handleChange(e)} name="email" placeholder="Input Email" />
                    <input value={formInput.username} onChange={(e) => handleChange(e)} name="username" placeholder="Input Username" />
                    <input value={formInput.firstname} onChange={(e) => handleChange(e)} name="firstname" placeholder="First Name" />
                    <input value={formInput.lastname} onChange={(e) => handleChange(e)} name="lastname" placeholder="Last Name" />
                    <input value={formInput.password} onChange={(e) => handleChange(e)} name="password" placeholder="Password" />
                    <input value={formInput.confpassword} onChange={(e) => handleChange(e)} name="confpassword" placeholder="Re-type Password" />
                    {/* <Link to = "/"> */}
                    <button className="button" onClick={handleSubmit}> Register </button> 
                    {/* </Link>  */}
                </form>

            </div>
        </div>
    )
}


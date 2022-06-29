import "./RegistrationForm.css"
import * as React from "react"

export default function RegistrationForm( {} ) {
    const [registrationForm, setRegistrationForm] = React.useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") <= 0) 
            {
                console.log("Invalid email")
            // setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else 
            {

                console.log("is good, continue")
            // setErrors((e) => ({ ...e, email: null }))
            }
        }
        
        setRegistrationForm({ ...registrationForm, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = () => {
        // here is where I would make the post request to the back end api
    }

    return (
        <div className="login-form">


            <div className="input-field">
                <label htmlFor="username">Username</label>
                <br/>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="your_username" 
                    value={registrationForm.username}
                    onChange={handleOnInputChange} />
            </div>

            <div className="input-field">
                <label htmlFor="first_name">First Name</label>
                <br/>
                <input 
                    type="text" 
                    name="first_name" 
                    placeholder="First" 
                    value={registrationForm.first_name}
                    onChange={handleOnInputChange} />
            </div>

            <div className="input-field">
                <label htmlFor="last_name">Last Name</label>
                <br/>
                <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Last" 
                    value={registrationForm.last_name}
                    onChange={handleOnInputChange} />
            </div>
            
            
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <br/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="user@gmail.com" 
                    value={registrationForm.email}
                    onChange={handleOnInputChange}></input>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <br/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={registrationForm.password}
                    onChange={handleOnInputChange}></input>
            </div>

            <div className="input-field">
                <label htmlFor="confirm_password">Confirm Password</label>
                <br/>
                <input 
                    type="password" 
                    name="confirm_password" 
                    placeholder="password again" 
                    value={registrationForm.confirm_password}
                    onChange={handleOnInputChange}></input>
            </div>

            <button className="btn" onClick={handleOnSubmit}>Log In</button>
        </div>
    )
}
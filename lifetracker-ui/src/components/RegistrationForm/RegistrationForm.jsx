import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import apiClient from "../../services/apiClient"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import "./RegistrationForm.css"



export default function Signup({  }) {

  const {setUser} = useAuthContext()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
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

  const handleOnSubmit = async () => {
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }
    const {data, error} = await apiClient.signupUser({email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, username: form.username});
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
    setIsLoading(false);

  }

  return (
    <div className="register-form">
      <div className="card">
        <h2>Register</h2>
        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@doe.io"
              value={form.email}
              onChange={handleOnInputChange}
            />
            
          </div>
          {errors.email && <span className="error">{errors.email}</span>}
          <div className="input-field">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="username"
              placeholder="JaneDoe123"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            
          </div>
          {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
        <div className="btn-row">
            <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
                {isLoading ? "Loading..." : "Create Account"}
            </button>
        </div>
          
        </div>

        <div className="footer">
          <p>
            Already have an account? Login <Link id="here-text" className="here-text" to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
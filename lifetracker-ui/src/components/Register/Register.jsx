import { useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import lady from "../../assets/lady-exercising.jpeg"
import axios from "axios"
import apiClient from "../../../services/apiClient"
import "./Register.css"

const locationOptions = [
  { key: 1, label: "Local Clinic", value: "local clinic" },
  { key: 2, label: "Regional Hospital", value: "regional hospital" },
  { key: 3, label: "Care Center", value: "care center" },
  { key: 4, label: "Department of Health", value: "department of health" },
]

export default function Signup({ setAppState, setUser, user}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: new Date(),
    password: "",
    passwordConfirm: "",
    agreeToTerms: true,
  })


  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])


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

    const {data, error} = await apiClient.signupUser({email:form.email, password: form.password, firstName: form.firstName,
      lastName: form.lastName, date: new Date(), })
    if(error) setErrors((e) => ({...e, form:error}))
    if(data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
      navigate("/activity")
    }

    // try {
    //   const res = await axios.post("http://localhost:3005/auth/register", {
    //     date: form.date,
    //     location: form.location,
    //     firstName: form.firstName,
    //     lastName: form.lastName,
    //     email: form.email,
    //     password: form.password,
    //   })

    //   if (res?.data?.user) {
    //     const { token } = res.data;
    //     localStorage.setItem("token", token);
    //     const decodedToken = jwtDecode(token);
    //     setAppState(decodedToken);

    //     //setAppState(res.data)
    //     setIsLoading(false)
    //     navigate("/activity")
       
        
        
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
    //     setIsLoading(false)
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="Register">
      <div className="media">
       <img src = {lady} alt = "Woman exercising "/>
       

      </div>
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
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>

        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}



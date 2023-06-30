import "./Register.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [regForm, setRegForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      if (regForm.confPassword && regForm.confPassword !== e.target.value) {
        setErrors((err) => ({
          ...err,
          confPassword: "Password's do not match",
        }));
      } else {
        setErrors((err) => ({ ...err, confPassword: null }));
      }
    }

    if (e.target.name === "confPassword") {
      if (regForm.password && regForm.password !== e.target.value) {
        setErrors((err) => ({
          ...err,
          confPassword: "Password's do not match",
        }));
      } else {
        setErrors((err) => ({ ...err, confPassword: null }));
      }
    }

    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((err) => ({ ...err, email: "Please enter a valid email." }));
      } else {
        setErrors((err) => ({ ...err, email: null }));
      }
    }
    
    setRegForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  async function handleOnSubmit() {
    setErrors((e) => ({ ...e, regForm: null }));
    setIsLoading(true);
    if (regForm.password !== regForm.confPassword) {
      setErrors((e) => ({ ...e, confPassword: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, confPassword: null }));
    }

    try {
      const result = await axios.post("http://localhost:3000/auth/register", {
        username: regForm.username,
        firstName: regForm.firstName,
        lastName: regForm.lastName,
        email: regForm.email,
        password: regForm.password,
      });

      if (result?.data?.user) {
        //setAppState to result.data
        //navigate to "/portal"
        setIsLoading(false);
      } else {
        setErrors((err) => ({
          ...err,
          form: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  }

  return (
    <div className="register-form">
      <h2>Create An Account</h2>
      <form className="card">
        <input
          type="text"
          name="email"
          value={regForm.email}
          onChange={handleChange}
          placeholder="✉️  someone@mail.com"
          required
        />
        
        <input
          type="text"
          name="username"
          value={regForm.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <div className="reg-names">
          <input
            type="text"
            name="firstName"
            value={regForm.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={regForm.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={regForm.password}
          onChange={handleChange}
          placeholder="🔒  Password"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          name="confPassword"
          value={regForm.confPassword}
          onChange={handleChange}
          placeholder="🔒  Confirm Password"
          required
        />
       <div className="show-password-button">
            <input
              type="checkbox"
              onClick={handleShowPassword}
              value={showPassword}
            />
            Show Password
          </div>
        <button
          className="sign-up-button"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading... " : "Create Account"}
        </button>
      </form>
    </div>
  );
}

import "./RegistrationForm.css";
import { useState } from "react";
import axios from "axios";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({ setAppState }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [regForm, setRegForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      if (
        regForm.passwordConfirm &&
        regForm.passwordConfirm !== e.target.value
      ) {
        setErrors((err) => ({
          ...err,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((err) => ({ ...err, passwordConfirm: null }));
      }
    }

    if (e.target.name === "passwordConfirm") {
      if (regForm.password && regForm.password !== e.target.value) {
        setErrors((err) => ({
          ...err,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((err) => ({ ...err, passwordConfirm: null }));
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
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function signupUser() {
    setErrors((e) => ({ ...e, regForm: null }));
    setIsLoading(true);
    if (regForm.password !== regForm.passwordConfirm) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signupUser({
      email: regForm.email,
      password: regForm.password,
      username: regForm.username,
      firstName: regForm.firstName,
      lastName: regForm.lastName,
    });
    if (error) setErrors((e) => ({ ...e, regForm: error }));
    if (data?.user) {
      setAppState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
      apiClient.setToken(data.token);
      navigate("/activity");
    }
    setIsLoading(false);

    // try {
    //   const result = await axios.post("http://localhost:3000/auth/register", {
    //     username: regForm.username,
    //     firstName: regForm.firstName,
    //     lastName: regForm.lastName,
    //     email: regForm.email,
    //     password: regForm.password,
    //   });

    //   if (result?.data?.user) {
    //     setAppState({user: result.data});
    //     navigate('/')
    //     setIsLoading(false);
    //   } else {
    //     setErrors((err) => ({
    //       ...err,
    //       form: "Something went wrong with registration",
    //     }));
    //     setIsLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   const message = err?.response?.error?.message;
    //   setErrors((e) => ({
    //     ...e,
    //     form: message ? String(message) : String(err),
    //   }));
    //   setIsLoading(false);
    // }

    setRegForm({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  }

  return (
    <div className="registration-form">
      <h2>Create An Account</h2>
      <form className="card">
        <input
          className="form-input"
          type="email"
          pattern=".+@globex\.com"
          name="email"
          value={regForm.email}
          onChange={handleChange}
          placeholder="✉️  someone@mail.com"
          required
        />
        {errors.email && <span className="errors">{errors.email}</span>}
        <input
          className="form-input"
          type="text"
          name="username"
          value={regForm.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <div className="reg-names">
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={regForm.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={regForm.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className="form-input"
          type={showPassword ? "text" : "password"}
          name="password"
          value={regForm.password}
          onChange={handleChange}
          placeholder="🔒  Password"
          required
        />
        {errors.password && <span className="errors">{errors.password}</span>}

        <input
          className="form-input"
          type={showPassword ? "text" : "password"}
          name="passwordConfirm"
          value={regForm.passwordConfirm}
          onChange={handleChange}
          placeholder="🔒  Confirm Password"
          required
        />
        {errors.passwordConfirm && (
          <span className="errors">{errors.passwordConfirm}</span>
        )}
        <div className="show-password-button">
          <input
            className="form-input"
            type="checkbox"
            onClick={handleShowPassword}
            value={showPassword}
          />
          Show Password
        </div>
        <button
          className="submit-registration"
          disabled={isLoading}
          onClick={signupUser}
        >
          {isLoading ? "Loading... " : "Create Account"}
        </button>
      </form>
    </div>
  );
}

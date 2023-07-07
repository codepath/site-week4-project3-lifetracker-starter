import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function Login({ setAppState }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState();
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function loginUser(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) setErrors((e) => ({ ...e, loginForm: error }));
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
    //   const result = await axios.post(
    //     "http://localhost:3000/auth/login",
    //     loginForm
    //   );

    //   if (result?.data) {
    //     setIsLoading(false);
    //     setAppState({user: result.data});
    //     navigate('/')
    //   } else {
    //     setErrors((e) => ({
    //       ...e,
    //       form: "Invalid username/password combination",
    //     }));
    //     setIsLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   const message = err?.response?.data?.error?.message;
    //   setErrors((e) => ({
    //     ...e,
    //     form: message ? String(message) : String(err),
    //   }));
    //   setIsLoading(false);
    // }

    setLoginForm({
      email: "",
      password: "",
    });
  }

  function handleOnChange(e) {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1)
        setErrors((e) => ({ ...e, email: "Please enter a valid email" }));
      else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  return (
    <div className="login-form">
      <h2>Log In</h2>
      <div className="card">
        <form>
          <input
            className="form-input"
            value={loginForm.email}
            type="email"
            pattern=".+@globex\.com"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleOnChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <div className="show-password-button">
            <input type="checkbox" onClick={handleShowPassword} />
            Show Password
          </div>
          <button
            className="submit-login"
            disabled={isLoading}
            onClick={loginUser}
          >
            {isLoading ? "Loading... " : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

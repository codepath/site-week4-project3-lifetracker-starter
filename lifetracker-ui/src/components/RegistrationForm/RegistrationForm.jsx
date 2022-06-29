import * as React from "react";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "passwords don't match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "passwords don't match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  return (
    <div className="registration-form">
      <div className="reg-card">
        <h2 className="reg-title">Register</h2>
        <div className="l-form">
          <div className="input-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              onChange={handleOnInputChange}
              placeholder="user@gmail.com"
              value={form.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-input"
              type="text"
              name="username"
              onChange={handleOnInputChange}
              placeholder="your_username"
              value={form.username}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label className="form-label" htmlFor="name">
                First Name
              </label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="input-field">
              <label className="form-label" htmlFor="name">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="input-field">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handleOnInputChange}
              placeholder="Enter a secure password"
              value={form.password}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="form-input"
              type="password"
              name="passwordConfirm"
              onChange={handleOnInputChange}
              placeholder="Confirm your password"
              value={form.passwordConfirm}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>
          <button className="submit-login" onClick={() => {}}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

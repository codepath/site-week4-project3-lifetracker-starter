import * as React from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
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
    <div className="login-form">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
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
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handleOnInputChange}
              placeholder="password"
              value={form.password}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <button className="submit-login" onClick={() => {}}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

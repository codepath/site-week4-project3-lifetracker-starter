import { Link } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useAuthContext } from "../../contexts/auth";

import "./LoginForm.css";

export default function LoginForm() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useLoginForm({ user, setUser });

  return (
    <div className="login-form">
      <h2>Login</h2>

      {Boolean(errors.form) && <span className="error">{errors.form}</span>}
      <br />

      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleOnInputChange}
            placeholder="email@gmail.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            name="password"
            type="password"
            value={form.password}
            onChange={handleOnInputChange}
            placeholder="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button
          className="submit-login"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>{" "}
      </div>
      <div className="footer">
        <p>
          Don't have an account? Sign up <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}

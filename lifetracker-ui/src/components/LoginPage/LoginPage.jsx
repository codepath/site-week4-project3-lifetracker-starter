import { Link } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useAuthContext } from "../../contexts/auth";

import "./LoginPage.css";

export default function LoginPage() {
  const { user, setUser } = useAuthContext();

  return (
    <div className="login-page">
      <LoginForm user={user} setUser={setUser} />
    </div>
  );
}

export function LoginForm({ user, setUser }) {
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
            type="email"
            name="email"
            placeholder="user@gmail.com"
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
            placeholder="Password"
            //value={form.password}
            //onChange={handleOnInputChange}
            value={form.password}
            onChange={handleOnInputChange}
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

import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

export function LoginForm() {
  return (
    <div className="login-form">
      <div className="card">
        <h2>Login to the Portal</h2>
        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              //value={form.email}
              //onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              //value={form.password}
              //onChange={handleOnInputChange}
            />
            <button className="btn">Login</button>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
          Don't have an account? Sign up <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}

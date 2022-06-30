import { Link } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="card">
        <h2>Register For an Account</h2>

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="jane@doe.io" />
          </div>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="your_username" />
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">First Name</label>
              <input type="text" name="firstName" placeholder="First Name" />
            </div>
            <div className="input-field">
              <label htmlFor="name">Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              // value={form.password}
              // onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
            />
          </div>

          <button className="btn">Create Account</button>
        </div>

        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import "./RegistrationPage.css";
import { useAuthContext } from "../../contexts/auth";

export default function RegistrationPage() {
  const { user, setUser } = useAuthContext();
  return (
    <div className="registration-page">
      <RegistrationForm user={user} setUser={setUser} />
    </div>
  );
}

export function RegistrationForm({ user, setUser }) {
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useRegistrationForm({ user, setUser });
  return (
    <div className="registration-form">
      <h2>Register For an Account</h2>
      <div className="form">
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

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

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
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
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
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
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
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
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
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>

          <button
            className="submit-registration"
            disabled={isLoading}
            onClick={handleOnSubmit}
          >
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>
      </div>

      <div className="footer">
        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}

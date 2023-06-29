import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log('hi')
    }
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/register">
            <button className="register-button" onSubmit={handleSubmit}>Register</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className="login-button" onSubmit={handleSubmit}>Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

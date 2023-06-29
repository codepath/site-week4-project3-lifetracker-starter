import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hi");
  }
  return (
    <nav className="Navbar">
      <ul className="logo">
        <li>
          <Link to="/">
            <img src="https://www.pngkit.com/png/detail/122-1228230_gemssq-gems-logo.png"/>
          </Link>
        </li>
      </ul>
      <ul className="links">
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

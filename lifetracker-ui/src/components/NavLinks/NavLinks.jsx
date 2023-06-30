import "./Navlinks.css";
import { Link } from "react-router-dom";

export default function NavLinks() {
  return (
    <div className="nav-links">
      <ul className="links">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

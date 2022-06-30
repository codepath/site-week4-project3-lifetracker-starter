import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks isLoggedIn={isLoggedIn} />
    </nav>
  );
}

export function Logo() {
  const logoUrl =
    "http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg";
  return (
    <div className="logo">
      <Link to="/">
        <img src={logoUrl} alt="CodePath logo" />
      </Link>
    </div>
  );
}

export function NavLinks({ isLoggedIn }) {
  return (
    <div className="nav-links">
      <Link to="/">
        <label className="link-label">Activity</label>
      </Link>
      <Link to="/nutrition/*">
        <label className="link-label">Nutrition</label>
      </Link>
      <Link to="/">
        <label className="link-label">Exercise</label>
      </Link>
      <Link to="/">
        <label className="link-label">Sleep</label>
      </Link>

      {isLoggedIn ? (
        <Link to="/">
          <label className="link-label green">Logout</label>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <label className="link-label">Login</label>
          </Link>
          <Link to="/register">
            <label className="link-label green">Sign Up</label>
          </Link>
        </>
      )}
    </div>
  );
}

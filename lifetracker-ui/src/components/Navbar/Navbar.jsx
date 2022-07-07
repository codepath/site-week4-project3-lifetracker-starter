import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../../contexts/auth";

export default function Navbar() {
  const { user, setUser, handleLogout } = useAuthContext();
  return (
    <nav className="navbar">
      <div className="content">
        <Logo />
        <NavLinks user={user} setUser={setUser} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export function Logo() {
  const logoUrl = "../../media/balance-scale.png";

  return (
    <div className="logo">
      <Link to="/">
        <img src={logoUrl} alt="CodePath logo" />
      </Link>
    </div>
  );
}

export function NavLinks({ handleLogout }) {
  const { user, setUser } = useAuthContext();
  return (
    <div className="nav-links">
      <Link to="/activity">
        <p className="link-label">Activity</p>
      </Link>
      <Link to="/nutrition/*">
        <label className="link-label">Nutrition</label>
      </Link>
      <Link to="/exercise">
        <label className="link-label">Exercise</label>
      </Link>
      <Link to="/sleep">
        <label className="link-label">Sleep</label>
      </Link>
      {user.email ? (
        <Link to="/">
          <button className="link-label special" onClick={handleLogout}>
            Logout
          </button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <label className="link-label">Login</label>
          </Link>
          <Link to="/register">
            <button className="link-label special">Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
}

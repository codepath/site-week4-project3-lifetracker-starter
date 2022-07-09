import { useAuthContext } from "../../contexts/auth";
import "./NavLinks.css";
import { Link } from "react-router-dom";

export default function NavLinks() {
  const { user, logoutUser } = useAuthContext();
  return (
    <div className="nav-links">
      <Link to="/activity">
        <label className="link-label">Activity</label>
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
      {user?.email ? (
        <Link to="/">
          <button className="link-label special" onClick={logoutUser}>
            Logout
          </button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <label className="link-label">Login</label>
          </Link>
          <Link to="/register">
            <label className="link-label special">Sign Up</label>
          </Link>
        </>
      )}
    </div>
  );
}

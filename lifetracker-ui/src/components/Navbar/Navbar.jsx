import { Link } from "react-router-dom";
import "./Navbar.css";
import NavLinks from "../NavLinks/NavLinks";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <Logo />
        <NavLinks />
      </div>
    </nav>
  );
}

export function Logo() {
  const logoUrl = "../../media/balance-scale.png";

  return (
    <div className="logo">
      <Link to="/">
        <img src={logoUrl} alt="Lifetracker logo" />
      </Link>
    </div>
  );
}

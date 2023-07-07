import "./Navbar.css";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks"

export default function Navbar({ appState, setAppState }) {

  return (
    <nav className="Navbar">
      <ul className="logo">
        <li>
          <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/CBC_Gem_logo.svg/2560px-CBC_Gem_logo.svg.png"/>
          </Link>
        </li>
      </ul>
      <NavLinks appState={appState} setAppState={setAppState}/> 
      
    </nav>
  );
}

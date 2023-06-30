import * as React from "react";
import Logo from "../Logo/Logo";
import "./Navbar.css";
import NavLinks from "../NavLinks/NavLinks";
import {useNavigate, Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn, setAppState }) {
    const navigate = useNavigate()
  
    const handleLogout = async (e) => {
        e.preventDefault();
        setAppState({});
        setIsLoggedIn(false);
        navigate("/");
      };
  
    const loggedIn = (
    <>
      <a className="chakra-link css-spn4bz">
        <button
          type="button"
          className="chakra-button css-td8gbm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </a>
    </>
  );

  const notLoggedIn = (
    <>
      <Link to="/login">
        <a className="chakra-link css-spn4bz" href="/login">
          <button type="button" className="chakra-button css-1t9i4zo">
            Sign In
          </button>
        </a>
      </Link>

      <Link to="/register">
        <a className="chakra-link css-spn4bz">
          <button type="button" className="chakra-button css-td8gbm">
            Register
          </button>
        </a>
      </Link>
    </>
  );


  return (
    <div className="Navbar ">
      <div className="content">
        <a className="chakra-link css-14rj303" href="/">
          <Logo />
        </a>
        <NavLinks />
      </div>
      <div className="content">{isLoggedIn ? loggedIn : notLoggedIn}</div>
    </div>
  );
}



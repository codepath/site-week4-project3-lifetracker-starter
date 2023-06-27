import * as React from "react";
import Logo from "../Logo/Logo";
import "./Navbar.css";
import NavLinks from "../NavLinks/NavLinks";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // <nav className="Navbar">
    //   <Logo />
    //   <NavLinks />
    //   <div class="css-70qvj9">
    //     <a class="chakra-link css-spn4bz" href="/login">
    //       <button type="button" class="chakra-button css-1t9i4zo">
    //         Sign In
    //       </button>
    //     </a>
    //     <a class="chakra-link css-spn4bz" href="/register">
    //       <button type="button" class="chakra-button css-td8gbm">
    //         Register
    //       </button>
    //     </a>
    //   </div>
    // </nav>

    <div class="Navbar ">
    <div class="content">
        <a class="chakra-link css-14rj303" href="/">
            <Logo/>
        </a>
        <NavLinks/>
    </div>
    <div class="content">
        <Link to="/login">
        <a class="chakra-link css-spn4bz" href="/login">
            <button type="button" class="chakra-button css-1t9i4zo">Sign In</button>
        </a>
        </Link>

        <Link to="/register">
        <a class="chakra-link css-spn4bz">
            <button type="button" class="chakra-button css-td8gbm">Register</button>
        </a>
        </Link>
    </div>
</div>






  );
}


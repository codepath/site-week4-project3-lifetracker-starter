import React, { Fragment, useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  
  const [confirmPassword, setConfirmPassword] = useState("");
  function showPass(event, id) {
    event.preventDefault();
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div style={{ marginTop: "5%" }} className="register">
        <span id="register-icon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <h1
          style={{ color: "var(--stark)", fontSize: "250%", marginTop: "-1px" }}
        >
          Create an Account
        </h1>
        <form id="register-form">
          <input
            className="register-input"
            type="email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            autoComplete="on"
            placeholder="Email"
          />
          <br />
          <input
            className="register-input"
            type="text"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
            autoComplete="on"
            placeholder="Username"
          />
          <br />
          <input
            id="first-name"
            type="text"
            value={userInfo.first_name}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                first_name: e.target.value,
              }))
            }
            autoComplete="on"
            placeholder="First name"
          />
          <input
            id="last-name"
            type="text"
            autoComplete="on"
            value={userInfo.last_name}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                last_name: e.target.value,
              }))
            }
            placeholder="Last name"
          />
          <br />
          <div className="register-button">
            <input
              className="button-input"
              id="button-input1"
              type="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              autoComplete="on"
              placeholder="Password"
            />
            <button onClick={() => showPass(event, "button-input1")}>
              Show
            </button>
          </div>
          <div className="register-button">
            <input
              className="button-input"
              id="button-input2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="on"
              placeholder="Confirm Password"
            />
            <button onClick={() => showPass(event, "button-input2")}>
              Show
            </button>
          </div>
          {userInfo.password !== confirmPassword ? (
            <span style={{ color: "white", float: "right" }}>
              Passwords do not match
            </span>
          ) : null}
          <button id="register-signup">Sign Up</button>
          <br />
        </form>
        <p style={{ color: "var(--stark)", fontSize: "x-large" }}>
          Have an account? &nbsp;
          <Link to="/login" style={{ color: "var(--fushia)" }} href="">
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
}

import React, { Fragment, useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    created_at: "",
    updated_at: "",
  });

  function handleSumbit(e) {
    e.preventDefault();
    if (
      userInfo.email &&
      userInfo.username &&
      userInfo.first_name &&
      userInfo.first_name &&
      userInfo.last_name &&
      userInfo.password &&
      userInfo.password.length > 8 &&
      userInfo.password === userInfo.confirmPassword &&
      userInfo.email.includes("@")
    ) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const date = currentDate.getDate().toString().padStart(2, "0");
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const seconds = currentDate.getSeconds().toString().padStart(2, "0");

      const datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

      setUserInfo((prevState) => ({
        ...prevState,
        created_at: datetime,
        updated_at: datetime,
      }));

      const res = async () => {
        await axios.post("http://localhost:3001/auth/register", {
          email: userInfo.email,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          password: userInfo.password,
          created_at: userInfo.created_at,
          updated_at: userInfo.updated_at,
        });
      };
      console.log(res)
    }
  }

  console.log(userInfo);

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
            type="username"
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
              value={userInfo.confirmPassword}
              onChange={(e) =>
                setUserInfo((prevState) => ({
                  ...prevState,
                  confirmPassword: e.target.value,
                }))
              }
              autoComplete="on"
              placeholder="Confirm Password"
            />
            <button onClick={() => showPass(event, "button-input2")}>
              Show
            </button>
          </div>
          {userInfo.password !== userInfo.confirmPassword ? (
            <>
              <span style={{ color: "red", marginLeft: "60%" }}>
                Passwords do not match
              </span>{" "}
              <br />
            </>
          ) : null}
          {userInfo.password.length > 8 ||
          userInfo.password.length === 0 ? null : (
            <>
              <span style={{ color: "red", marginLeft: "34%" }}>
                Your password must have a minimum of 8 characters.
              </span>
              <br />
            </>
          )}
          {userInfo.email.length === 0 ||
          userInfo.email.includes("@") ? null : (
            <span style={{ color: "red", marginLeft: "55%" }}>
              Your email must have an '@'.
            </span>
          )}
          <button onClick={handleSumbit} type="submit" id="register-signup">
            Sign Up
          </button>
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

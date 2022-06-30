import React from "react";

export default function RegistrationForm() {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    let isEmailValid = true;
    let isPasswordMatch = true;

    if (email != "") {
        isEmailValid = email.indexOf("@") > 0;
    }

    if (password != "" && passwordConfirm != "") {
        if (password === passwordConfirm) {
            isPasswordMatch = true;
            console.log("mathc");
        } else {
            isPasswordMatch = false;
            console.log("no mathc");
        }
    }

    return (
        <div className="registration-form">
            <label htmlFor="email" className="">
                Email
            </label>
            <input
                className="form-input"
                name="email"
                type="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="john.doe@mail.com"
            />

            {isEmailValid ? (
                <></>
            ) : (
                <div className="error">Please enter a valid email.</div>
            )}

            <label htmlFor="username">Username</label>
            <input
                className="form-input"
                name="username"
                type="text"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                placeholder="JDoe1"
            />
            <div className="name-input">
                <label htmlFor="firstName" className="hidden">
                    First Name
                </label>

                <input
                    className="form-input f-name"
                    name="firstName"
                    type="text"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder="John"
                />
                <label htmlFor="lastName" className="hidden">
                    Last Name
                </label>
                <input
                    className="form-input l-name"
                    name="lastName"
                    type="text"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder="Doe"
                />
            </div>
            <label htmlFor="password">Password</label>
            <input
                className="form-input"
                name="password "
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="password123"
            />
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
                className="form-input"
                name="passwordConfirm"
                type="password"
                onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                }}
                placeholder="password123"
            />
            {isPasswordMatch ? (
                <></>
            ) : (
                <p className="error">Passwords do not match.</p>
            )}
            <br />
            <button
                onClick={() => {
                    console.log("Line 115 set up signupUser()");
                }}
            >
                Create Account
            </button>
        </div>
    );
}

import React from "react";

// const

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    console.log(email);
    console.log(password);

    const [emailInvalid, setEI] = React.useState(<></>);
    return (
        <div className="login-form">
            <label htmlFor="email">Email:</label>
            <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@mail.com"
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.indexOf("@") > 0) {
                        setEI(<></>);
                    } else {
                        setEI(
                            <div className="invalid-email error">Invalid email</div>
                        );
                    }
                }}
            />
            {emailInvalid}
            <label htmlFor="email">Password:</label>
            <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button
                className="submit-login"
                onClick={() => {
                    console.error("LoginForm 41, Setup loginUser function");
                }}
            >
                Login
            </button>

            <br />
        </div>
    );
}

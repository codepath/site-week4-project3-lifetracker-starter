import React from "react";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    console.log(email);
    console.log(password);
    return (
        <div className="login-form">
            <label htmlFor="email">Email:</label>
            <br />
            <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@mail.com"
                onChange={(e) => {
                    let newValue = e.target.value;
                    if (newValue.indexOf("@") > 0) {
                        setEmail(newValue);
                    } else {
                        console.error("LoginForm 23, Please input a valid email");
                    }
                }}
            />
            <br />
            <label htmlFor="email">Password:</label>
            <br />
            <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <br />
            <button className="submit-login" onClick={()=>{
                console.error("LoginForm 41, Setup loginUser function")
            }}>Login</button>

            <br />
        </div>
    );
}

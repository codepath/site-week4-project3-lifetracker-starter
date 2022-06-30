import * as React from 'react'

export default function LoginForm() {
    const [isError, setIsError] = React.useState(false);
    function validateEmail() {

    }
    return (
        <div className="login-form">
            <input type="email" name="email" value="" onChange={console.log("email")}/>
            <input type="text" name="password" value="" onChange={console.log("password")}/>
        </div>
    )
}
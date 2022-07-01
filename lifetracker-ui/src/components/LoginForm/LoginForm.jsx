import * as React from 'react'
import "./LoginForm.css"

export default function LoginForm() {
    const [email, setEmail] = React.useState('');

    var error = '';
    function handleOnEmailChange(eve) {
        let currentEmail = eve.target.value;
        validateEmail(currentEmail);
        setEmail(currentEmail);
    }
    function validateEmail(currentEmail) {
        if(currentEmail.charAt(0) == '@' || currentEmail.charAt(currentEmail.length-1) == '@') {
            error = 'error';
        } else {
            error = '';
        }
    }
    return (
        <div className="login-form">
            <input type="email" name="email" value="" onChange={handleOnEmailChange}/>
            <input type="text" name="password" value="" onChange={console.log("password")}/>

            <div className={error}>*** Invalid Email ***</div>
        </div>
    )
}

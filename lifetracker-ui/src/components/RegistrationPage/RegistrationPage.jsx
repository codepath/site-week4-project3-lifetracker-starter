import "./RegistrationPage.css"

function RegistrationPage(){
    return(
        <div className="register-page">
        <div className="register-header">
            <h2>Create An Account</h2>
        </div>
        <div className="register-form">
            <form>
                <div className="register-fields">
                    <div className="email">
                        <input name = "email" type = "email" placeholder="Email"/>                       
                    </div> 
                    <div className="username">
                        <input name = "username" type = "text" placeholder="Username"/>                       
                    </div> 
                    <div className="f-name">
                        <input name = "first-name" type = "text" placeholder="First name"/>                       
                    </div> 
                    <div className="l-name">
                        <input name = "last-name" type = "text" placeholder="Last name"/>                       
                    </div> 
                    <div className="password">
                        <input name = "password" type = "password" placeholder = "Password"/>
                        <button type = "button" className="show-pass">
                            Show
                        </button>
                    </div>
                    <div className="c-password">
                        <input name = "confirm-password" type = "password" placeholder = "Confirm Password"/>
                        <button type = "button" className="show-pass">
                            Show
                        </button>
                    </div>
                    <div>
                        <button type = "sign-up" className="sign-up-btn">
                            Sign Up
                        </button>
                    </div>
                </div>

            </form>
        </div>
        <div className="sign-up">
            <p>Havean account?</p>
            <a className="sign-up-link" href = "/register">
                Login
            </a>

        </div>

    </div>
    )
}

export default RegistrationPage
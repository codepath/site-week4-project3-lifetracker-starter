import "./LoginPage.css"

function LoginPage(){
    return(
        <div className="login-page">
            <div className="login-header">
                <h2>Welcome</h2>
            </div>
            <div className="login-form">
                <form>
                    <div className="login-fields">
                        <div className="email">
                            <input name = "email" type = "email" placeholder="Email"/>                       
                        </div> 
                        <div className="password">
                            <input name = "password" type = "password" placeholder = "Password"/>
                            <button type = "button" className="show-pass">
                                Show
                            </button>

                        </div>
                        <div>
                            <button type = "submit" className="submit-btn">
                                Login
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            <div className="sign-up">
                <p>New to us?</p>
                <a className="sign-up-link" href = "/register">
                    Sign Up
                </a>

            </div>

        </div>
    )
}

export default LoginPage
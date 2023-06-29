import "./Register.css";

export default function Register() {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <div className="register">
      <h2>Create An Account</h2>
      <form className="registration-form">
        <input type="text" name="Email" placeholder="✉️  someone@mail.com" />
        <input type="text" name="Username" placeholder="Username" />
        <div className="reg-names">
          <input type="text" name="First Name" placeholder="First Name" />
          <input type="text" name="Last Name" placeholder="Last Name" />
        </div>
        <input type="text" name="Password" placeholder="🔒  Password" />
        <input type="text" name="Password" placeholder="🔒  Confirm Password" />
        <button className="sign-up-button" onClick={handleClick}>SIGN UP</button>
      </form>
    </div>
  );
}

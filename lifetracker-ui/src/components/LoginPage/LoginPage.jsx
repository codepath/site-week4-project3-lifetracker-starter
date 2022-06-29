import * as React from "react";
import "./LoginPage.css";
import LoginForm from "components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ loggedIn = false }) {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      {loggedIn == false ? (
        <LoginForm />
      ) : (
        React.useEffect(() => {
          navigate("/activity"), [];
        })
      )}
    </div>
  );
}

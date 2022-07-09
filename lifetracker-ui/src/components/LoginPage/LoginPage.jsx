import { useAuthContext } from "../../contexts/auth";
import LoginForm from "../LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./LoginPage.css";

export default function LoginPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.email) {
      navigate("/activity");
    }
  });

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

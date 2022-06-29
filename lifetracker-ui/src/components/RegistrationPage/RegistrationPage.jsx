import * as React from "react";
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage({ loggedIn = false }) {
  const navigate = useNavigate();
  return (
    <div className="registration-page">
      {loggedIn == false ? (
        <RegistrationForm />
      ) : (
        React.useEffect(() => {
          navigate("/activity"), [];
        })
      )}
    </div>
  );
}

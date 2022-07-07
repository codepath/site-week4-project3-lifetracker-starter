import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient"

export const useLoginForm = ({user, setUser}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    console.log("submitting...")
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
  
      const { data, error } = await apiClient.loginUser({
        email: form.email,
        password: form.password,
      });
      console.log("after api call")
      if (data) {
        setUser(data.user);
        apiClient.setToken(data.token);
      }
      if (error) {
        setErrors((e) => ({ ...e, form: error }));
      }
      setIsLoading(false);
    };

    return {
      form, 
      errors, 
      isLoading, 
      handleOnInputChange, 
      handleOnSubmit
    }
}
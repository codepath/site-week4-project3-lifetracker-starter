import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient"

export const useRegistrationForm = ({ user, setUser}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

    useEffect(() => {
        if (user?.email) {
          navigate("/activity")
        }
      }, [user, navigate])
  
    const handleOnInputChange = (event) => {
      if (event.target.name === "password") {
        if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
          setErrors((e) => ({
            ...e,
            passwordConfirm: "Password's do not match",
          }));
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }));
        }
      }
      if (event.target.name === "passwordConfirm") {
        if (form.password && form.password !== event.target.value) {
          setErrors((e) => ({
            ...e,
            passwordConfirm: "Password's do not match",
          }));
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }));
        }
      }
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
      setIsLoading(true);
      setErrors((e) => ({ ...e, form: null }));
  
      if (form.passwordConfirm !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
        setIsLoading(false);
        return;
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
  
      const { data, error } = await apiClient.signup({
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
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
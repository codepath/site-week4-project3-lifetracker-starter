import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState();

  const loginUser = async () => {
    const { data, error } = await apiClient.login(credentials);
    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
      localStorage.setItem("kavholm_token", data.token);
    }
    if (error) setError(error);
  };

  const signupUser = async () => {
    const { data, error } = await apiClient.signupUser(credentials);
    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
      localStorage.setItem("kavholm_token", data.token);
    }
    if (error) setError(error);
  };

  const fetchUserFromToken = async () => {
    const { data } = await apiClient.fetchUserFromToken();
    if (data) {
      setUser(data.user);
    }
    setInitialized(true);
  };

  const logoutUser = async () => {
    apiClient.logoutUser();
    setUser({});
    setInitialized(true);
    setError(null);
  };

  const authValue = {
    user,
    setUser,
    isProcessing,
    setIsProcessing,
    setError,
    initialized,
    setInitialized,
    error,
    loginUser,
    signupUser,
    fetchUserFromToken,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

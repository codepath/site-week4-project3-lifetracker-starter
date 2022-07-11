import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import apiClient from "../services/apiClient";

const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     if (user) {
  //       setIsProcessing(true);
  //       setError(null);
  //       const { data } = await apiClient.listActivity();
  //       console.log(data);

  //       if (data) {
  //         console.log(data);
  //         setActivity(data);
  //         setError(null);
  //       } else {
  //         setError("Error getting activities");
  //       }
  //       setIsProcessing(false);
  //       setInitialized(true);
  //     }
  //   };
  //   fetchActivities();
  // }, []);

  const authValue = {
    activity,
    initialized,
    isProcessing,
    setIsProcessing,
    setInitialized,
    setActivity,
    error,
    setError,
  };
  return (
    <ActivityContext.Provider value={authValue}>
      <>{children}</>
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => useContext(ActivityContext);

import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import apiClient from "../services/apiClient";

const ActivityContext = createContext(null);

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsloading] = useState();
  const [error, setError] = useState(null);

  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        setIsloading(true);
        setError(null);
        const { data } = await apiClient.listActivities({ user });
        if (data) {
          setActivity(data);
          setError(null);
        } else {
          setError("Error getting activities");
        }
        setIsloading(false);
      }
    };
    fetchActivities();
  }, []);

  const authValue = { activity, initialized, isLoading, error };
  return (
    <ActivityContext.Provider value={authValue}>
      <>{children}</>
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => useContext(ActivityContext);

import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import apiClient from "../services/apiClient";

const NutritionContext = createContext();

export const NutritionContextProvider = ({ children }) => {
  const [nutrition, setNutrition] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const getNutritions = async () => {
    const { data, error } = await apiClient.listNutritions();
    if (data) {
      setNutrition(data.nutritions);
    }
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getNutritions();
    }
    setIsLoading(false);
    setInitialized(true);
  }, []);

  const nutritionValue = {
    nutrition,
    setNutrition,
    initialized,
    isLoading,
    error,
  };

  return (
    <NutritionContext.Provider value={nutritionValue}>
      <>{children}</>
    </NutritionContext.Provider>
  );
};

export const useNutritionContext = () => useContext(NutritionContext);

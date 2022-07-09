import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import apiClient from "../services/apiClient";

const NutritionContext = createContext();

export const NutritionContextProvider = ({ children }) => {
  const [nutrition, setNutrition] = useState([]);
  const [initialized, setInitialized] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const fetchNutritions = async () => {
    console.log("Step 5");

    if (user) {
      console.log("Step 6");

      setIsLoading(true);
      const { data } = await apiClient.listNutritions();
      if (data) {
        console.log("Step 7 data: ", data);

        setNutrition(data);
        setError(null);
      } else {
        setError("Error getting nutritions");
      }
      setIsLoading(false);
      setInitialized(true);
    }
    console.log("Context NUTRITION: ", nutrition);
  };

  const createNutrition = async (newestNutrition) => {
    console.log("Step 2");

    const { data } = await apiClient.createNutrition(newestNutrition);
    if (data) {
      setError(null);
    } else {
      setError("Error submitting nutrition");
    }
    setIsLoading(false);
    console.log("Step 4");

    fetchNutritions();
    return data;
  };

  const nutritionValue = {
    nutrition,
    setNutrition,
    fetchNutritions,
    createNutrition,
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

// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuthContext } from "./auth";
// import apiClient from "../services/apiClient";

// const NutritionContext = createContext(null);

// export const NutritionContextProvider = ({ children }) => {
//   const [nutritions, setNutritions] = useState([]);
//   const [initialized, setInitialized] = useState();
//   const [isLoading, setIsLoading] = useState();
//   const [error, setError] = useState(null);

//   const { user } = useAuthContext();

//   useEffect(() => {
//     if (user) {
//       setIsLoading(true);
//       const { data, errors } = apiClient.listNutritions();
//       if (error) {
//         setError(error);
//       } else {
//         setNutritions(data);
//       }
//     }
//     setIsLoading(false);
//     setInitialized(true);
//   }, []);

//   const nutritionValue = {
//     nutritions,
//     setNutritions,
//     initialized,
//     isLoading,
//     error,
//   };
//   return (
//     <NutritionContext.Provider value={nutritionValue}>
//       <>{children}</>
//     </NutritionContext.Provider>
//   );
// };

// export const useNutritionContext = () => useContext(NutritionContext);

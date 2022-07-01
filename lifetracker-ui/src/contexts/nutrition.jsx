import {createContext, useState, useContext, useEffect} from 'react'
import apiClient from "../services/apiClient";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({children}) => {
    const [nutritions, setNutritions] = useState([]);
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState();
    const [error, setError] = useState({nutrition: ""});

    useEffect(() => {
        console.log("useEffect")
        //check if user is logged in
        let loggedIn = false;
        const fetchUser = async () => {
            const {data, err} = await apiClient.fetchUserFromToken()
            if (data) loggedIn = true;
            if (err) setError(err);
          }
      
          const token = localStorage.getItem("lifetracker_token");
          if(token) {
            apiClient.setToken(token)
            fetchUser()
          }
          if (loggedIn){
              setIsProcessing(true);
              //get request to nutritions endpoint
              //set nutrititions to the data
          }
          setIsProcessing(false)
          setInitialized(true)

    }, [])


    const nutValue = {nutritions, 
        setNutritions, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        
    }

    return (
        <NutritionContext.Provider value={nutValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )

}

export const useNutritionContext = () => useContext(NutritionContext)
import {createContext, useState, useContext, useEffect} from 'react'
import apiClient from "../services/apiClient";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({children}) => {
    const [nutritions, setNutritions] = useState([]);
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState();
    const [error, setError] = useState({nutrition: ""});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("useEffect nutrition")
        //check if user is logged in
        const fetchUser = async () => {
            const {data, err} = await apiClient.fetchUserFromToken()
            if (data) setLoggedIn(true);
            if (err) setError(err);
        }
        const fetchNutr = async () => {
            const {data, err} = await apiClient.fetchNutrition();
            console.log(loggedIn, data);
            if (data) setNutritions(data.nutritions);
            if (err) setError(err);
        }
        
          
      
          const token = localStorage.getItem("lifetracker_token");
          if(token) {
            apiClient.setToken(token)
            fetchUser()
          }
          if (loggedIn){
              setIsProcessing(true);
              fetchNutr();
              console.log("nutritions", nutritions)
              //get request to nutritions endpoint
              //set nutrititions to the data
          }
          
          setIsProcessing(false)
          setInitialized(true)

    }, [loggedIn, initialized])

    function newNutrition(info) {
        const fetchNew = async () => {
            const {data, err} = await apiClient.newNutrition(info);

        }
        const fetchNutr = async () => {
            const {data, err} = await apiClient.fetchNutrition();
            console.log(loggedIn, data);
            if (data) setNutritions(data.nutritions);
            if (err) setError(err);
        }
        fetchNew();
        fetchNutr();
        console.log("nutritions after new", nutritions);

    }


    const nutValue = {nutritions, 
        setNutritions, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        newNutrition
        
    }

    return (
        <NutritionContext.Provider value={nutValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )

}

export const useNutritionContext = () => useContext(NutritionContext)
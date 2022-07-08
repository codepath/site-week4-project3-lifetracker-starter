import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/apiClient"
import { useAuthContext} from "./auth";

const NutritionContext = createContext(null)

export const NutritionontextProvider = ({children}) => {
    const [nutritions, setNutritions] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
const fetchNutritions = async () => {
                    setIsLoading(true)
                    setError(null)
                    const {data, error} = await API.fetchNutrition()
                    if(data){
                        setNutritions(data.nutrition)
                    }
                    if(error){
                        setError(error)
                    }
                setInitialized(true)
                setIsLoading(false)
            }
    useEffect(() => {    
        

            const token = localStorage.getItem("my_token")
            if (token && user) {
              API.setToken(token)
              fetchNutritions()
            }

    }, [setNutritions])

    const nutritionValue = {fetchNutritions, nutritions, setNutritions, initialized, setInitialized, isLoading, setIsLoading, error, setError}
    
    return (
        <NutritionContext.Provider value={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () => useContext(NutritionContext)
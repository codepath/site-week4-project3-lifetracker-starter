import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/apiClient"
import { useAuthContext} from "./auth";

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = useState(null)
    const [initialized, setInitialzed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    const fetchActivity = async () => {
                    setIsLoading(true)
                    setError(null)
                    const {data, error} = await API.fetchActivity()
                    if(data){
                        setActivity(data)
                    }
                    if(error){
                        setError(error)
                    }
                setInitialzed(true)
                setIsLoading(false)
            }

    useEffect(() => {    
            const token = localStorage.getItem("my_token")
            if (token && user) {
              API.setToken(token)
              fetchActivity()
            }

    }, [setActivity])

    const activityValue = {fetchActivity, activity, setActivity, initialized, setInitialzed, isLoading, setIsLoading, error, setError}
    return (
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext)
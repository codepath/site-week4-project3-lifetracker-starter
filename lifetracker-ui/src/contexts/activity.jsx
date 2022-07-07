import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/apiClient"
import { useAuthContext} from "./auth";

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = useState([])
    const [initialized, setInitialzed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {    
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
        if(user){fetchActivity()}
    }, [setActivity])

    const activityValue = {activity, setActivity, initialized, setInitialzed, isLoading, setIsLoading, error, setError, fetchActivity}
    return (
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext)
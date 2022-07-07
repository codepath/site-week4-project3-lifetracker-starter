import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/apiClient"

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = useState([])
    const [initialized, setInitialzed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const activityValue = {activity, setActivity, initialized, setInitialzed, isLoading, setIsLoading, error, setError}
    return (
        <ActivityContext.Provider value={activityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext)
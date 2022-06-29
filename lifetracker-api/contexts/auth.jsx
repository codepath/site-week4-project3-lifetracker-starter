import React from 'react'
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext()

export default function AuthContextProvider(props) {
    const [user, setUser] = useState()
    const [intialized, setInitialized] = useState()
    const [isProcessing, setIsProcessing] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        //  That hook should check to see if a JWT token exists in local storage under the lifetracker_token key
    }, [AuthContextProvider])

    return (
        <AuthContext.Provider>

        </AuthContext.Provider>
    )
}

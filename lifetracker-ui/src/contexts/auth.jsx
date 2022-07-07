import * as React from "react"
import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const authValue = {user, setUser}

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
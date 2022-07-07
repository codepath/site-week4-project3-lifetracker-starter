import * as React from "react"
import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/apiClient"

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})


    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await API.fetchUserFromToken()
          if (data) {
            setUser(data.user)
          }
          if(error){
            //setError(error)
          }
        }
    
        const token = localStorage.getItem("my_token")
        if (token) {
          API.setToken(token)
          fetchUser()
        }
      }, [setUser])

      const handleLogout = async () => {
        await API.logoutUser()
        setUser({})
        //setError(null)
      } 
    
      const authValue = {user, setUser, handleLogout}

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
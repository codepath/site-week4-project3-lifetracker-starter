import * as React from "react"
import ApiClient from "../services/apiClient"
// const { API_BASE_URL } = require("../constants")
API_BASE_URL = "http://localhost:3001"

const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState(null)

    const apiClient = ApiClient(API_BASE_URL)
    
    React.useEffect(() => {
        console.log("Entered use effect for the AuthContext.Provider")
        const fetchUser = () => {
        // this would usually be your own backend, or localStorage
        // for example
        const tokenForUser = null
        try {
            tokenForUser = localStorage.getItem("lifetracker_token")
            if (tokenForUser !== null)
            {
                apiClient.setToken(tokenForUser)
                setIsProcessing(true)
                setError(null)
                setUser(this.fetchUserFromToken())
                setError(null)
            }
        }
        catch (error)
        {
            setError(error.message)
            console.error(error.message)
        }

        setIsProcessing(false)
        setInitialized(true)
    };

    fetchUser();
  }, []);

    const loginUser = (userParameter) => {
        apiClient.login(userParameter)
    }

    const signupUser = (userParameter) => {
        apiClient.signup(userParameter)
    }

    const fetchUserFromToken = () => {
        apiClient.fetchUserFromToken()
    }

    const logoutUser = () => {
        localStorage.removeItem("lifetracker_token")
        location.reload()
    }
  
  return (
    <AuthContext.Provider value={{  user, setUser,
                                    initialized, setInitialized,
                                    isProcessing, setIsProcessing,
                                    error, setError,
                                    loginUser,
                                    signupUser,
                                    fetchUserFromToken,
                                    logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
    const newHook = React.useContext(AuthContext);
    if (newHook === undefined) {
        throw new Error("useAuthContext can only be used inside AuthContextProvider");
    }
    return newHook;
   };

import {createContext, useState, useContext, useEffect} from 'react'

const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        console.log("useEffect")
    }, [])

    function loginUser() {
        console.log("login context");
    }

    function signupUser() {
        console.log("signup context");
    }

    function fetchUserFromToken() {
        console.log("fetch context");
    }

    function logoutUser() {
        console.log("logout context");
    }

    const authValue = {user, 
        setUser, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        signupUser,
        fetchUserFromToken,
        logoutUser
    }

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext)
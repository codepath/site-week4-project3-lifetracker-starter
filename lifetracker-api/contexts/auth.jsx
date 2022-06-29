import * as React from "react"

const AuthContext = React.createContext()

export default function AuthContextProvider() {
    const [user, setUser] = React.useState(null)
    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        
    })
    
    return (
        <AuthContext.Provider>

        </AuthContext.Provider>
    )
}
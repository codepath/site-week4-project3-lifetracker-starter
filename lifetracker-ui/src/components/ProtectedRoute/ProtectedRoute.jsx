import { useAuthContext } from "../../contexts/auth"
import * as React from "react"
import LoginPage from "components/LoginPage/LoginPage"

export default function ProtectedRoute(element){
    const {initialized, user} = useAuthContext()

    return(
        <>
        {(!{initialized} && !{user}) ? (<LoginPage/>) : (element)}
        </>
    )
}
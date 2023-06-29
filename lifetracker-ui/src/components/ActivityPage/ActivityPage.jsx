import * as React from "react"
import "./ActivityPage.css"

export default function ActivityPage({appState, isLoggedIn}) {

    const authenticathedUser = 
    <>
    <h2>Hello 😁 {appState?.user?.firstName}</h2>
    </>
    const noAuthenticathed =
    <>
    <h2> only authenticated users can view this page</h2>
    </>

    return (
      <div className="ActivityPage">

        {isLoggedIn ? authenticathedUser : noAuthenticathed}

        
  
        
      </div>
    )
  }
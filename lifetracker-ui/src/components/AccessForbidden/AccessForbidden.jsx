import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./AccessForbidden.css"

export default function AccessForbidden() {
    return (
        <div className="access-forbidden">
            <div className="content">
                <h1 className="forbidden"> Need to Login first </h1>
            </div>
        </div>
        
    )
  }

  
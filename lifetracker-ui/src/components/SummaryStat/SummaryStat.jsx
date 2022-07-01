import * as React from "react"

export default function SummaryStat(props) {
    return (
        <div className="summary-stat">
            <div className="background">
                <p>{props.date ? props.date : props.category}</p>
                <h1>{props.calories}</h1>
            </div>
        </div>
    )
  }
